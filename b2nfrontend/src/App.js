import './App.css';
import * as React from 'react';

import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./Home"
import Issue from "./Issue"

import { Typography, TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function App() {
  //const [value, setValue] = React.useState('Controlled');

  return (
    <div className="App">

      <Typography variant="h1">
        From books to nooks
      </Typography>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Issue" element={<Issue />} />
      </Routes>

    </div>
  );
}

export default App;
