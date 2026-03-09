import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const initGA = () => {
  import('react-ga4').then(({ default: ReactGA }) => {
    ReactGA.initialize('G-XXKW2BDQBL');
  });
};

if ('requestIdleCallback' in window) {
  requestIdleCallback(initGA);
} else {
  setTimeout(initGA, 1000);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);