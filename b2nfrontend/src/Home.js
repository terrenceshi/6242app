import './App.css';
import * as React from 'react';

import { TextField, Box, Button, Autocomplete, CircularProgress } from '@mui/material';
import { useState, useRef, useEffect} from 'react';
import './bootstrap.min.css';
import { csv } from 'd3-request';
import url from "./book_data_with_author.csv";
import './Home.css';

import axios, {isCancel, AxiosError} from 'axios';


  // <script src="jquery-3.6.1.min.js"></script>
  //each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example
  const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  const [bookData, setBookData] = useState([{}])

  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);

  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

const book = [];

csv(url, function(err, data) {
  for (let i = 0; i < data.length; i++) {
    book.push(data[i]["title"]);
  }

})

var playlists = {};
var genreList = []

function Home() {

  var song = ""
  // var genreList = []

  const getSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    song = event.target.value
  }
  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(genreInput)
    var newKey = bookInput + " playlist - " + genreInput

    var newUrl = playlists[newKey]
    var split = newUrl.split('/');

    newUrl = "https://open.spotify.com/embed/user/spotify/playlist/" + split[split.length - 1];
    console.log(newUrl)

    document.getElementById("spotifyPlaylist").src = newUrl;
  };

  // var playlists = {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(bookInput)
    var spotifyPlaylist = document.getElementById("spotifyPlaylist");
    var progress = document.getElementById("progress");
    var addPref = document.getElementById("addPref");

    var axiosInput = {};
    axiosInput[bookInput] = 1

    if (progress.style.display === 'none') {
      progress.style.display = 'inline';
    }

    axios.post('http://127.0.0.1:5000', axiosInput)
        .then(function(response){
            console.log(response);
            playlists = response['data'];

            if (progress.style.display === 'inline') {
              progress.style.display = 'none';
            }

            var defaultKey = bookInput + " playlist - default"

            var defaultUrl = playlists[defaultKey]

            //https://open.spotify.com/playlist/24Ffs2F3fk9JmjDikhfrRk
            //https://open.spotify.com/embed/user/spotify/playlist/0ZtNpjS6cTeLIa1KpQ4cpp

            //console.log("HEREEEE")
            var genre = ""
            for (const [key, value] of Object.entries(playlists)) {
              // console.log(key);
              genre = key;
              genre = genre.split("playlist");
              genre = genre[1].split(" ")
              console.log(genre[2])
              genreList.push(genre[2])
            }

            var split = defaultUrl.split('/');

            var newUrl = "https://open.spotify.com/embed/user/spotify/playlist/" + split[split.length - 1];

            document.getElementById("spotifyPlaylist").src = newUrl;

            if (spotifyPlaylist.style.display === 'none') {
                spotifyPlaylist.style.display = 'inline';
              }
            if (addPref.style.display === 'none') {
                addPref.style.display = 'inline';
            }


    })
    .catch(function(error){
        console.log(error);
    //Perform action based on error
    });

  };

  const [options, setOptions] = useState([]);
  const [bookInput, setBookInput] = useState("");
  const [isValid, setValid] = useState(false);

  const validate = () => {
    const lower = book.map(element => {
      return element.toLowerCase();
    });
    return lower.includes(bookInput);
  };

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [bookInput]);

  const onInputChange = (event) => {
    setOptions(
      book.filter((option) => option.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setBookInput(event.target.value.toLowerCase());

    console.log(bookInput)

  };

  const [genres, setGenreOptions] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [genreValid, setGenreValid] = useState(false);

  const validateGenre = () => {
    const lower = genreList.map(element => {
      return element.toLowerCase();
    });
    return lower.includes(genreInput);
  };

  useEffect(() => {
    const genreValid = validateGenre();
    setGenreValid(genreValid);
  }, [genreInput]);

  const onGenreInputChange = (event) => {

    console.log("GENRE LISTSSS")
    console.log(genreList)
    console.log(playlists)
    setGenreOptions(
      genreList.filter((option) => option.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setGenreInput(event.target.value.toLowerCase());

    console.log(genreInput)

  };

  var title = ""
  const getTitle = (event, value) => {
    console.log(value)
  }

  return (

    <div className="Home">

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >

        <div className="container">
          <SearchbarDropdown size= "5"
            className = "bookSearchbarDropdown"
            options={options}
            value = {bookInput}
            onInputChange={onInputChange}
          />
          <br />

        </div>


        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleChange}>
            Generate Playlist
        </Button>

        <div>
          <br />
          <br />
          <br />
          <br />
        </div>

        <Box
          component="form"
          sx={{
            '& .CircularProgress-root': { m: 1, width: '200px', padding: '0.25rem' },
            padding: '1rem'
          }}
          noValidate
          autoComplete="off"
          alignItems="center"
          justifyContent="center"
          id = "progress"
          style={{display: 'none'}}
        >
          <CircularProgress />
        </Box>
        

        <iframe
          id="spotifyPlaylist" style={{display: 'none'}}
          src="https://open.spotify.com/embed/user/spotify/playlist/0ZtNpjS6cTeLIa1KpQ4cpp"
          width="650" height="380" frameBorder="0" allowtransparency="true">
        </iframe>

        <div>
          <br />
          <br />
        </div>

        <div id="addPref" style={{display: 'none', width: '20px'}}>
          <h5
            className="text"
            >Don't like what you see? Type a genre you like:
          </h5>

          <div className="container">
            <SearchbarDropdown size= "2"
              className = "bookSearchbarDropdown"
              options={genreList}
              value = {genreInput}
              onInputChange={onGenreInputChange}
            />
          </div>

          <Button
              className="genre-button"
              variant="contained"
              disabled={!genreValid}
              onClick={handleGenreChange}>
                Search Genre
          </Button>
        </div>

        <div>
          <br />
        </div>

      </Box>

    </div>
  );
}

export default Home;
