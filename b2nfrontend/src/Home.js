import './App.css';
import * as React from 'react';

import { TextField, Box, Button, Autocomplete, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect} from 'react';
import './bootstrap.min.css';
import { csv } from 'd3-request';
import url from "./book_data_with_author.csv";
import './Home.css';

import axios from 'axios';

const book = [];

csv(url, function(err, data) {
  for (let i = 0; i < data.length; i++) {
    book.push(data[i]["title"]);
  }
  //console.log(book.includes("The Hunger Games"))
})

var playlists = {};
var genreList = []

function Home() {
  //code to handle mobile resizing
  const [isMobile, setIsMobile] = useState(1)
 
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(350 / 900)

    } else {
        setIsMobile(1)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  //Code that handles input to first textfield.
  const [bookInput, setBookInput] = useState("");
  
  const [disabledBtn, setDBtn] = React.useState(true);
  
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const autoChange = (event, value) => {
    setBookInput(value)

    setDBtn(false)

    if(value == null) {
      setDBtn(true)
    }
    
  }

  var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  //Bulk of the code that talks to the backend in order to get our playlists.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(bookInput)
    var spotifyPlaylist = document.getElementById("spotifyPlaylist");
    var progress = document.getElementById("progress");
    var addPref = document.getElementById("addPref");

    var axiosInput = {};
    axiosInput[bookInput] = 1

    if (spotifyPlaylist.style.display === 'inline') {
      spotifyPlaylist.style.display = 'none';
    }
    if (addPref.style.display === 'flex') {
      addPref.style.display = 'none';
    }

    if (progress.style.display === 'none') {
      progress.style.display = 'inline';
    }

    //https://b2n-backend2.herokuapp.com/
    //http://127.0.0.1:5000
    //http://3.140.47.122

    //BACKEND GUIDE: https://medium.com/techfront/step-by-step-visual-guide-on-deploying-a-flask-application-on-aws-ec2-8e3e8b82c4f7

    axios.post('https://b2nbackend.ml', axiosInput)
        .then(function(response){
            console.log(response);
            playlists = response['data'];

            var defaultKey = bookInput + " playlist - default"

            var defaultUrl = playlists[defaultKey]

            var genre = ""
            if(genreList.length !== 0) {
              genreList = [];
            }
            for (const [key, value] of Object.entries(playlists)) {
              genre = key;
              genre = genre.split("playlist");
              genre = genre[1].split(" ")
              console.log(genre[2])
              genreList.push(genre[2])
            }

            var split = defaultUrl.split('/');

            var newUrl = "https://open.spotify.com/embed/user/spotify/playlist/" + split[split.length - 1];

            document.getElementById("spotifyPlaylist").src = newUrl;

            wait(500); //wait for a half a second since sometimes the spotify playlist takes a minute to swap

            if (progress.style.display === 'inline') {
              progress.style.display = 'none';
            }

            if (spotifyPlaylist.style.display === 'none') {
                spotifyPlaylist.style.display = 'inline';
              }
            if (addPref.style.display === 'none') {
                addPref.style.display = 'flex';
            }


    })
    .catch(function(error){
        console.log(error);
    //Perform action based on error
    });

  };

  //Code for genre change
  const [genreInput, setGenreInput] = useState("");
  const [disabledBtn2, setDBtn2] = React.useState(true);

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(genreInput)
    var newKey = bookInput + " playlist - " + genreInput

    var newUrl = playlists[newKey]
    var split = newUrl.split('/');

    newUrl = "https://open.spotify.com/embed/user/spotify/playlist/" + split[split.length - 1];
    console.log(newUrl)

    document.getElementById("spotifyPlaylist").src = newUrl;
  };

  const autoGChange = (event, value) => {
    setGenreInput(value)
    setDBtn2(false)

    if(value == null) {
      setDBtn2(true)
    }
    
  }

  return (
    <div className="Home">

      <Grid
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2},
        }}
        noValidate
        autoComplete="off"
        container direction = "column"
        alignItems="center"
      >

        <Autocomplete
          id="autocomplete"
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          onChange={autoChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={book}
          getOptionLabel={(option) => option}
          style={{ width: isMobile * 700 + 'px' }}
          renderInput={(params) => (
            <TextField {...params} label="Enter a book title" variant="outlined" />
          )}
        />

        <Button
          id = "generate"
          variant="contained"
          disabled = {disabledBtn}
          sx = {{ m: 1 }}
          onClick={handleChange}>
            Generate Playlist
        </Button>

        <div>
          <br />
          <br />
        </div>

        <Box
          id = "progress"
          style={{display: 'none'}}
        >
          <CircularProgress 
            size={200}
            thickness={3}
            value={100}
          />
        </Box>
        
        <iframe
          id="spotifyPlaylist" style={{display: 'none'}} title = "myFrame"
          src="https://open.spotify.com/embed/user/spotify/playlist/0ZtNpjS6cTeLIa1KpQ4cpp"
          width = {isMobile * 700} height="380" frameBorder="0" allowtransparency="true">
        </iframe>

        <div>
          <br />
          <br />
        </div>

      </Grid>

      <Grid 
        container direction = "column"
        sx={{
          '& .MuiTextField-root': { m: 2},
        }}
        component="form"
        alignItems="center"
        justifyContent="center"
        id="addPref"
        style={{display: 'none'}}
      >
        <h5
          >Don't like what you see?
        </h5>

        <Autocomplete
          id="autocomplete2"
          options={genreList}
          onChange={autoGChange}
          style={{ width: isMobile * 700 + 'px' }}
          renderInput={(params) => (
            <TextField {...params} label="Enter your favorite genre" variant="outlined" />
          )}
        />

        <Button
            className="genre-button"
            variant="contained"
            disabled = {disabledBtn2}
            sx = {{ m: 1 }}
            onClick={handleGenreChange}>
              Search Genre
        </Button>
      </Grid>

        <div>
          <br />
        </div>

    </div>
  );
}

export default Home;
