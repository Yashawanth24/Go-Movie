import { useEffect } from 'react'
import {API_OPTIONS} from '../Components/Constants'
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';
const useUpComingMovies=()=>{
    const dispatch =useDispatch();

    const getUpComingMovies= async()=>{
    const response=await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1',API_OPTIONS);
    
    const data=await response.json();

    dispatch(addUpcomingMovies(data.results));
    };
    useEffect(()=>{
        getUpComingMovies();
    }, []);
}
export default useUpComingMovies;