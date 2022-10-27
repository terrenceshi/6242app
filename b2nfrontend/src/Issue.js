import './App.css';
import * as React from 'react';

import { Typography, TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function Issue() {
  //const [value, setValue] = React.useState('Controlled');

  var subject = ""
  var message = ""

  const getSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    subject = event.target.value
  }
  const getMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    message = event.target.value
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(subject)
    console.log(message)
  };
  return (
    <div className="Issue">
      <Typography variant="h4">
        Submit Feedback
      </Typography>
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
            label="Subject"
            multiline
            maxRows={2}
            onChange={getSubject}
          />
          
        </div>

        <div>
          <TextField
              id="outlined-multiline-flexible"
              label="Your Message"
              multiline
              rows = {12}
              onChange={getMessage}
          />
        </div>

        <Button
          variant="contained"
          onClick={handleChange}>
            Submit Feedback
        </Button>
      </Box>

    </div>
  );
}

export default Issue;
