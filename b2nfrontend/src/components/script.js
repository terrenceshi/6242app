import * as React from 'react';

import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./Home"
import Issue from "./Issue"

import { Typography, TextField, Box, Button } from '@mui/material';

//each textfield has attributes value and defaultvalue which can be used if we want our page to open with an example

function Model() {
  //const [value, setValue] = React.useState('Controlled');

  return (
    <div className="Model">
      <script src="https://cdn.jsdelivr.net/npm/onnxjs/dist/onnx.min.js"></script>
      <script>
        async function test() {
          const sess = new onnx.InferenceSession()
          await sess.loadModel('./onnx_model.onnx')

          const input = new onnx.Tensor(new Float32Array(28 * 28), 'float32', [1,1,28,28]) //THIS IS INPUT SIZE- SUBJECT TO CHANGE!!!

          const outputMap = await sess.run([input])

          const outputTensor = outputMap.values().next().value

          console.log(`Output tensor: ${outputTensor.data}`)
        }
        test()
      </script>

    </div>
  );
}

export default App;
