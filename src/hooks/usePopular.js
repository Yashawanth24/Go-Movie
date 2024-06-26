import { useEffect } from 'react'
import {API_OPTIONS} from '../Components/Constants'
import { useDispatch } from 'react-redux';
import { addNowPopularMovies } from '../utils/movieSlice';
const usePopularMovies=()=>{
    const dispatch =useDispatch();

    const getPopularMovies= async()=>{
    const response=await fetch( 'https://api.themoviedb.org/3/movie/popular?&page=1',API_OPTIONS);
    const data=await response.json();
    console.log(data)
    dispatch(addNowPopularMovies(data.results));
    };
    useEffect(()=>{
        getPopularMovies();
    }, []);
}
export default usePopularMovies;
