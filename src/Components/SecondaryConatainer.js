import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryConatainer = () => {
    const movies=useSelector(store=> store.movies)
  
  return  (
    <div className=''>
        <MovieList id='NowPlaying' title={"Now Playing"} movies={movies.nowPlayingMovies}/> 
         <MovieList id='Trending' title={"Trending"} movies={movies.topratedMovies}/>
         <MovieList id='Popular' title={"Popular"} movies={movies.popluarMovies}/> 
         <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>        
 </div>
  )
}

export default SecondaryConatainer

