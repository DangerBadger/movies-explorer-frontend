import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';

import Main from '../Main/Main';
import Header from '../Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <Main />
    </div>
  );
}

export default App;
