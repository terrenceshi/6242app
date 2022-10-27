import './App.css';
import * as React from 'react';

import { Typography, TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function Home() {
  //const [value, setValue] = React.useState('Controlled');

  var title = ""
  var author = ""

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    title = event.target.value
  }
  const getAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    author = event.target.value
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(event.target.value);
    console.log(title)
    console.log(author)
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
      
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Book Title"
            multiline
            maxRows={4}
            onChange={getTitle}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Author Name"
            multiline
            maxRows={4}
            onChange={getAuthor}
          />
          
        </div>

        <Button
          variant="contained"
          onClick={handleChange}>
            Generate Playlist
        </Button>
      </Box>

    </div>
  );
}

export default Home;
