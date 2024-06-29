import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Browse from './Components/Browse';
import MovieStreamersPage from './Components/MovieStreamersPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Browse />} />
        <Route path='/watch/:movieId' element={<MovieStreamersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;