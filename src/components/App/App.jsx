import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';

import Main from '../Main/Main';
import Header from '../Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
