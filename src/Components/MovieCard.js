import React from 'react'; 
import { IMG_CON_URL } from './Constants';

const MovieCard = ({ posterPath, onClick }) => 
  { return ( 
  <div className='w-48 pr-4' onClick={onClick}> 
  <img alt='Poster' src={IMG_CON_URL + posterPath} /> 
  </div> ); }

export default MovieCard;