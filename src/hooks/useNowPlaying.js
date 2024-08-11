import React, { useEffect } from 'react'


import { useDispatch } from 'react-redux';
import { addNowPlayingMovie } from '../utils/movieSlice';
const useNowPlaying=()=>{
    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
    const dispatch =useDispatch();
    const getNowPlayingMovie= async()=>{
        const OPTIONS = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
          };
          
    const response=await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1&region=US',OPTIONS);
    const data=await response.json();
   
    dispatch(addNowPlayingMovie(data.results));
    };
    useEffect(()=>{
        getNowPlayingMovie();
    }, []);
}
export default useNowPlaying;
