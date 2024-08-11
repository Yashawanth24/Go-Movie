import { useEffect } from "react";
import { movieTrailer } from "../utils/movieSlice";
import { useDispatch, } from "react-redux";


const useMovieTrailer=(Movieid)=>{
  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
    const dispatch=useDispatch();
    const getMovieVideos=async()=>{
      const OPTIONS = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      
        const response=await fetch('https://api.themoviedb.org/3/movie/'+Movieid+'/videos?language=en-us', OPTIONS);
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