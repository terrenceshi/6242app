import './App.css';
import * as React from 'react';

import { Typography, TextField, Box, Button } from '@mui/material';
import { send } from 'emailjs-com';

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
    document.getElementById('box').style.display = 'none';
    document.getElementById('thanks').style.display = 'inline';

    var values = {"from_name":subject, "message": message}

    send("service_0602y29","template_b8aan8k", values, "ppwP83mIzUcRkBa63");
  };

  return (
    <div className="Issue">
      <Typography variant="h4" id = "thanks" style={{display: 'none'}}>
          Thanks for submitting!
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '600px', padding: '0.25rem' },
          padding: '1rem'
        }}
        noValidate
        autoComplete="off"
        id = "box"
      >
        <Typography variant="h4" id = "submitFeedback">
          Submit Feedback
        </Typography>

        

        <div>
          <TextField
            id="outlined-multiline-flexible_sub"
            // label="Subject"
            placeholder="Your name..."
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