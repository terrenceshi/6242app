import './App.css';
import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Issue from "./Issue"
import {TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function Home() {
  //const [value, setValue] = React.useState('Controlled');
  var title = ""
  var author = ""
  var song = ""
  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    title = event.target.value
  }
  const getAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    author = event.target.value
  }
  const getSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    song = event.target.value
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(title)
    console.log(author)
  };
  
  return (
    <div>
      <Box
        component="form"
        
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      
        <div>
          <TextField
          	className="field"
          	type="text"
            id="outlined-multiline-flexible"
            label="Book Title"
            multiline
            maxRows={4}
            onChange={getTitle}
          >
          </TextField>
          <TextField
          	className="field"
            id="outlined-multiline-flexible"
            label="Author Name"
            multiline
            maxRows={4}
            onChange={getAuthor}
          ></TextField>
          
        </div>

        <Button
          className="button"
          variant="contained"
          onClick={handleChange}>
            Generate Playlist
        </Button>
      </Box>
      <Routes>
        <Route path="/Issue" element={<Issue />} />
      </Routes>
      <h5
      	className="text"
      	>Don't like what you see?
      </h5>
      <a 
        className="link"
      	href="https://spotify.com">
      	Click here
      </a>
      
      <h5
      	className="preferences"
      	>
      	Type a song you like:
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
          onClick={handleChange}>
            Search
       </Button>
    </div>
  );
}

export default Home;
