import './App.css';
import * as React from 'react';

import { Typography, TextField, Box, Button, Toolbar, AppBar, IconButton, Tabs, Tab, List, ListItem, Menu } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import styled from "@mui/styled-engine";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect} from 'react';
import './bootstrap.min.css';
import { csv } from 'd3-request';
import url from "./book_data_with_author.csv";
import './Home.css';


// <script src="jquery-3.6.1.min.js"></script>
//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example
const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();

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
    // if (data[i]["author"] != "") {
    //   book.push(data[i]["title"] + " by " + data[i]["author"]);
    // } else {
    //   book.push(data[i]["title"]);
    // }
  }

 console.log(data);
})



// function postData(input) {
//     $.ajax({
//         type: "POST",
//         url: "/reverse_pca.py",
//         data: { param: input },
//         success: callbackFunc
//     });
// }
//
// function callbackFunc(response) {
//     // do something with the response
//     console.log(response);
// }
//
// postData('data to process');






function Home() {
  //const [value, setValue] = React.useState('Controlled');

  var song = ""

  const getSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    song = event.target.value
  }
  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(song)
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(bookInput)
    var spotifyPlaylist = document.getElementById("spotifyPlaylist");
    var addPref = document.getElementById("addPref");
    if (spotifyPlaylist.style.display == 'none') {
        spotifyPlaylist.style.display = 'inline';
      }
    if (addPref.style.display == 'none') {
        addPref.style.display = 'inline';
    }
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
  };




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
   <SearchbarDropdown size= "5" className = "bookSearchbarDropdown" options={options} value = {bookInput} onInputChange={onInputChange}/>
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
        <iframe
        // episode/7makk4oTQel546B0PZlDM5
        // https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWWvHBEQLnV1N
          id="spotifyPlaylist" style={{display: 'none'}}
          src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWWvHBEQLnV1N"
          width="650" height="380" frameBorder="0" allowtransparency="true">
        </iframe>


        <div>
        <br />
        <br />
        <br />
        </div>

<div id="addPref" style={{display: 'none'}}>
      <h5
      	className="text"
      	>Don't like what you see? Type a song that matches what you're looking for:
      </h5>

      <TextField
          	className="song-field"
            id="outlined-multiline-flexible"
            label="Song Name"
            multiline
            maxRows={4}
            onChange={getSong}
          >
      </TextField>
      <Button
          className="song-button"
          variant="contained"
          onClick={handleSongChange}>
            Search
       </Button>
</div>


      </Box>




    </div>
  );
}

export default Home;
