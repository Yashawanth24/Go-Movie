import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import {  addTopRatedMovies } from '../utils/movieSlice';
const useTopRatedMovies=()=>{
    const dispatch =useDispatch();

    const getTopRatedMovies= async()=>{
        const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
        const OPTIONS = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
          };
          
    const response=await fetch('https://api.themoviedb.org/3/movie/top_rated?&page=1&region=IN',OPTIONS);
    
    const data=await response.json();
    
    dispatch(addTopRatedMovies(data.results));
    };
    useEffect(()=>{
        getTopRatedMovies();
    }, []);
}
export default useTopRatedMovies;
