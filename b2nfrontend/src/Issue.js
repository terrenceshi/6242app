import './App.css';
import * as React from 'react';

import { Typography, TextField, Box, Button } from '@mui/material';
import { send } from 'emailjs-com';
import { useState, useEffect} from 'react';

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

  const [isMobile, setIsMobile] = useState(1)
 
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(0.5)

    } else {
        setIsMobile(1)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <div className="Issue">
      <Typography variant="h4" id = "thanks" style={{display: 'none'}} sx = {{ m : 1}}>
          Thanks for submitting!
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, padding: '0.25rem' },
          padding: '1rem'
        }}
        noValidate
        autoComplete="off"
        id = "box"
      >
        <Typography variant="h4" id = "submitFeedback" sx = {{ m : 1}}>
          Submit Feedback
        </Typography>

        <div>
          <TextField
            id="outlined-multiline-flexible_sub"
            // label="Subject"
            placeholder="Your name..."
            multiline
            maxRows={2}
            sx = {{ width: isMobile * 700 + 'px' }}
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
              sx = {{ width: isMobile * 700 + 'px' }}
              onChange={getMessage}
          />
        </div>

        <Button
          variant="contained"
          sx = {{ m: 1}}
          onClick={handleChange}>
            Submit Feedback
        </Button>
      </Box>

    </div>
  );
}

export default Issue;