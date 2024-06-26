import React from 'react'
import useNowPlaying from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopular';
import useUpComingMovies from '../hooks/useUpComing';
import useTopRatedMovies from '../hooks/useTopRated';


const Browse = () => {
   useNowPlaying();
   usePopularMovies();
   useUpComingMovies();
   useTopRatedMovies();
  return (
    <div>

    </div>
  )
}

export default Browse