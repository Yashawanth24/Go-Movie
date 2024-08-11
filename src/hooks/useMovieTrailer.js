import { useEffect } from "react";
import { movieTrailer } from "../utils/movieSlice";
import { useDispatch, } from "react-redux";


const useMovieTrailer=(Movieid)=>{
  const API_OPTIONS = process.env.OPTIONS;
    const dispatch=useDispatch();
    const getMovieVideos=async()=>{
        const response=await fetch('https://api.themoviedb.org/3/movie/'+Movieid+'/videos?language=en-us', API_OPTIONS);
        const data=await response.json();
       
        const filterdData=data.results.filter(video=> video.type==="Trailer");
        const trailer=filterdData.length ? filterdData[0] : data.results[0];
        dispatch(movieTrailer(trailer))
      };
      useEffect(()=>{
       (getMovieVideos());
      }, [])
}
 export default useMovieTrailer;