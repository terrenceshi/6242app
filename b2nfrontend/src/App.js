import './App.css';
import * as React from 'react';

import { Route, Routes} from 'react-router-dom';
import Home from "./Home"
import Issue from "./Issue"
import Nav from "./Nav.js";
import About from "./About.js";

import { Typography, TextField, Box, Button } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function App() {
  //const [value, setValue] = React.useState('Controlled');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className = "navbar" >
          <Nav/>
        </div>
        
        <div className = "titleCard">
          <Typography variant="h1" 
            className = "titleContent"
            align = "center" >
            From Books to Nooks
          </Typography>
        </div>
        
        <div className = "content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Feedback" element={<Issue />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </div>

      </div>
    </ThemeProvider>
    

  );
}

export default App;