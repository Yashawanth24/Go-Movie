import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import {  addTopRatedMovies } from '../utils/movieSlice';
import { API_OPTIONS } from '../Components/Constants';
const useTopRatedMovies=()=>{
    const dispatch =useDispatch();

    
    const getTopRatedMovies= async()=>{
    const response=await fetch('https://api.themoviedb.org/3/movie/top_rated?&page=1&region=IN',API_OPTIONS);
    
    const data=await response.json();
    
    dispatch(addTopRatedMovies(data.results));
    };
    useEffect(()=>{
        getTopRatedMovies();
    }, []);
}
export default useTopRatedMovies;
