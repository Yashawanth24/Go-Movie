import React from 'react'
import useNowPlaying from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopular';
import useUpComingMovies from '../hooks/useUpComing';
import useTopRatedMovies from '../hooks/useTopRated';
import MainContainer from './MainContainer';


const Browse = () => {
   useNowPlaying();
   usePopularMovies();
   useUpComingMovies();
   useTopRatedMovies();
  return (
    <div>
<MainContainer/>
    </div>
  )
}

export default Browse