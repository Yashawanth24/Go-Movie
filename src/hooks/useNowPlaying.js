import React, { useEffect } from 'react'


import { useDispatch } from 'react-redux';
import { addNowPlayingMovie } from '../utils/movieSlice';
const useNowPlaying=()=>{
    const API_OPTIONS = process.env.OPTIONS;
    const dispatch =useDispatch();

    const getNowPlayingMovie= async()=>{
    const response=await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1&region=IN',API_OPTIONS);
    const data=await response.json();
   
    dispatch(addNowPlayingMovie(data.results));
    };
    useEffect(()=>{
        getNowPlayingMovie();
    }, []);
}
export default useNowPlaying;
