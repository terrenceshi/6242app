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
    message = event.target.value;
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(subject)
    console.log(message)
    document.getElementById('outlined-multiline-flexible_sub').value = '';
    document.getElementById('outlined-multiline-flexible_mess').value = '';
    document.getElementById('outlined-multiline-flexible_sub').placeholder = 'Subject';
    document.getElementById('outlined-multiline-flexible_mess').placeholder = 'Your Message...';
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
            id="outlined-multiline-flexible_sub"
            // label="Subject"
            placeholder="Subject"
            multiline
            maxRows={2}
            onChange={getSubject}
          />

        </div>

        <div>
          <TextField
              id="outlined-multiline-flexible_mess"
              // label="Your Message"
              placeholder="Your Message..."
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