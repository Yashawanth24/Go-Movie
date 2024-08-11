import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { addNowPopularMovies } from '../utils/movieSlice';
const usePopularMovies=()=>{
    const dispatch =useDispatch();
    const API_OPTIONS = process.env.OPTIONS;
    const getPopularMovies= async()=>{
    const response=await fetch( 'https://api.themoviedb.org/3/movie/popular?&page=1&region=IN',API_OPTIONS);
    const data=await response.json();
    dispatch(addNowPopularMovies(data.results));
    };
    useEffect(()=>{
        getPopularMovies();
    }, []);
}
export default usePopularMovies;
