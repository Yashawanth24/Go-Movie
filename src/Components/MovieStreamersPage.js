import React from 'react';
import MovieStreamers from './MovieStremers';
import { useParams } from 'react-router-dom';
import MovieDetails from './MovieDetails';


const MovieStreamersPage = () => {
   
  return (
    <div>
      <MovieDetails/>
      <MovieStreamers />
    </div>
  );
};

export default MovieStreamersPage;