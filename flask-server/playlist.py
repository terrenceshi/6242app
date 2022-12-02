import numpy as np
import pandas as pd
import torch

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth

from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin

import boto3
from smart_open import open as smart_open
import io

app = Flask(__name__)
cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def test():
    return {"hi": ["hello"]}

@app.route("/test")
def test2():
    return {"hi2": ["hello2"]}

@app.route("/", methods = ["POST"])
@cross_origin()
def getPlaylists():
    def getLinks(bookName, inputDict):
        '''
        bookName - obviously the book's name

        inputDict - dictionary where the key is the playlist title and the value is the list of uris for the playlist
                    for example:
                        key: cujo - rock
                        values: [uri1, uri2, ...]
        '''
        #Set up all the keys and stuff
        SPOTIFY_CLIENT_ID ="8960c84e74964817bfb927e83f6e2b59"
        SPOTIFY_SECRET ="3917b5e7cc3342189238c7290f99be3c"
        REDIRECT_URL = "http://localhost:8080/"

        sp = spotipy.Spotify(
            auth_manager=SpotifyOAuth(
                scope="playlist-modify-public",
                redirect_uri=REDIRECT_URL,
                client_id=SPOTIFY_CLIENT_ID,
                client_secret=SPOTIFY_SECRET,
                cache_path="token.txt"
            )
        )

        user_id = "31bezwu6mascvq773ob6sb7bikjy" #This is books2nooks's id

        #cut out uri headers
        for key in inputDict:
            spotify_song_uris = []

            for uri in inputDict[key]:
                spotifyHeader = 'spotify:track:'

                cutUri = uri[len(spotifyHeader):]

                spotify_song_uris.append(cutUri)

            inputDict[key] = spotify_song_uris

        #loop through existing playlists to avoid duplicate playlists and to get links
        os = 0
        stop = False

        inputKeys = list(inputDict.keys())
        holder = [0] * len(inputKeys)

        links = dict(zip(inputKeys, holder))

        while True:
            segment = sp.user_playlists(user_id, limit = 50, offset = os)

            numItems = len(segment['items'])

            for item in segment['items']:
                if item['name'] in inputDict:
                    inputDict.pop(item['name'])

                    links[item['name']] = item["external_urls"]['spotify']

                    if len(inputDict) == 0:
                        stop = True
                        break

            if stop:
                break

            if numItems < 50 or segment['items'] == []:
                break

            os += 50

        if not stop:
            desc = "Generated playlist for " + bookName

            for key in inputDict:
                playlist = sp.user_playlist_create(user=f"{user_id}", name = key, public=True,
                                                    description=desc)

                playlistId = playlist["id"]

                link = playlist['external_urls']['spotify']

                sp.user_playlist_add_tracks(user=f"{user_id}", playlist_id=playlistId, tracks=inputDict[key])

                links[key] = link

            return links
        else:
            #print('playlist exists already, here is link:')
            return links

    client = boto3.client(
        's3',
        aws_access_key_id= "AKIAQVYK7Y7U46UDIBMP",
        aws_secret_access_key= "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",
        region_name = "us-east-1"
    )

    music_ix_fname = client.get_object(Bucket = "b2n-heroku-bucket", Key = "data/books_ix.csv")['Body']
    books_ix_fname = client.get_object(Bucket = "b2n-heroku-bucket", Key = "data/books_ix.csv")['Body']
    musicfname = client.get_object(Bucket = "b2n-heroku-bucket", Key = "data/combinedMusicData_small.csv")['Body']

    wfile = client.get_object(Bucket = "b2n-heroku-bucket", Key = "model/W_rank100.pt")['Body']
    hfile = client.get_object(Bucket = "b2n-heroku-bucket", Key = "model/H_rank100.pt")['Body']
    playlist_size = 15
    top_n = 1000

    #request.headers.add("Access-Control-Allow-Origin", "*")

    query = request.json
    query = list(query.keys())[0]

    # load model

    with smart_open(hfile, 'rb') as f:
        buffer = io.BytesIO(f.read())
        H = torch.load(buffer,map_location=torch.device('cpu'))

    with smart_open(wfile, 'rb') as f:
        buffer = io.BytesIO(f.read())
        W = torch.load(buffer,map_location=torch.device('cpu'))


    # load book/music indices
    music_ix = pd.read_csv(music_ix_fname, header=None)
    books_ix = pd.read_csv(books_ix_fname, header=None)

    # compute all music scores for a given book
    #try:
    query_ix = books_ix.index[books_ix[0].map(lambda x: x.lower()) == query.lower()].values[0]
    song_scores = (W[query_ix] @ H.T)
    top_song_ix = np.argsort(song_scores.detach().numpy())[::-1][:top_n]

    music_df = pd.read_csv(musicfname, skiprows = lambda x: x not in np.sort(top_song_ix)+1, header=None)
    # music_df.columns = ['title','tag','artist','year','views','features','lyrics','id','lang','uri']
    music_df.columns = ["title", 'tag', 'artist', 'year', 'views', 'uri']
    music_df['score'] = song_scores.detach().numpy()[np.sort(top_song_ix)]

    #print("found genres")
    #print(music_df['tag'].value_counts().index.values)

    inputDict = {}

    first = True
    concatDf = 0

    for genre in music_df['tag'].value_counts().index.values:
        if genre != 'misc': # avoid misc category, they are not songs.
            #print(genre)
            playlist_df = music_df[music_df['tag'] == genre].sort_values('score',ascending=False)[:playlist_size]
            #print(playlist_df)
            #print()

            playlistName = query + ' playlist - ' + genre

            inputDict[playlistName] = playlist_df['uri'].tolist()

            if first:
                concatDf = playlist_df
                first = False
            else:
                concatDf = pd.concat([concatDf, playlist_df])

    concatDf = concatDf.sort_values(by=['score'], ascending=False)
    concatDf = concatDf.head(playlist_size)

    #print('default')
    #print(concatDf)
    #print()
    #print('Creating playlists on spotify now...')

    defaultName = query + ' playlist - default'

    inputDict[defaultName] = concatDf['uri'].tolist()

    output = getLinks(query, inputDict)

    return output

    #except:
        #print(f"Book query '{query}' did not match to existing book")

    return {}
        
if __name__ == "__main__":
    app.run(debug=True)