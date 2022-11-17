import './App.css';
import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./Home"
import Issue from "./Issue"
import {TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function App() {
  
  return (
    <div className="App">
      <h1 className="title">
        From Books to Nooks
      </h1>
      <h5 className="subtitle">
      	Curated playlists from your favorite book.
      </h5>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Issue" element={<Issue />} />
      </Routes>
    </div>
  );
}

export default App;
