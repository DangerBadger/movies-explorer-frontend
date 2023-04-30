import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const obj = {
  a: 1,
  b: 2,
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
