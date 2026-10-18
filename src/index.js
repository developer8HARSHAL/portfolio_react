import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactGA.initialize('G-XXKW2BDQBL');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
