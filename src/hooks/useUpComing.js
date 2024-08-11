import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';
const useUpComingMovies=()=>{
    const dispatch =useDispatch();
    
    const getUpComingMovies= async()=>{
        const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
        const OPTIONS = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
          };
          
    const response=await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1&region=IN',OPTIONS);
    
    const data=await response.json();

    dispatch(addUpcomingMovies(data.results));
    };
    useEffect(()=>{
        getUpComingMovies();
    }, []);
}
export default useUpComingMovies;