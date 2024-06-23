import React, { useEffect } from 'react'
import { API_OPTIONS } from './Constants'
import { useDispatch } from 'react-redux';
import { addNowPlayingMovie } from '../utils/movieSlice';

const Browse = () => {
    const dispatch =useDispatch();

    const getNowPlayingMovie= async()=>{
 const response=await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1',API_OPTIONS);
 const data=await response.json();
 console.log(data.results)
 dispatch(addNowPlayingMovie(data.results));
    };
    useEffect(()=>{
        getNowPlayingMovie();
    }, []);
  return (
    <div>

    </div>
  )
}

export default Browse