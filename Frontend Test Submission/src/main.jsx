import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../../Frontend_Test_Submission/src/App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);