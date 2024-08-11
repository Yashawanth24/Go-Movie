import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { addNowPopularMovies } from '../utils/movieSlice';
const usePopularMovies=()=>{
    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
    const dispatch =useDispatch();
    const getPopularMovies= async()=>{
        const OPTIONS = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
          };
          
    const response=await fetch( 'https://api.themoviedb.org/3/movie/popular?&page=1&region=US',OPTIONS);
    const data=await response.json();
    dispatch(addNowPopularMovies(data.results));
    };
    useEffect(()=>{
        getPopularMovies();
    }, []);
}
export default usePopularMovies;
