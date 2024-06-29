import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackGround from './VideoBackGround'
import VideoTitle from './VideoTitle'
import SecondaryConatainer from './SecondaryConatainer'
import MovieStremers from './MovieStremers'
import SearchMovie from './SearchMovie'
const MainContainer = () => {
  const movie=useSelector(store=> store?.movies?.nowPlayingMovies);
  
  if(!movie)return;
  const MainMovies=movie[0];

  const{original_title,overview,id}=MainMovies;

  return (
    <div>
      <SearchMovie/>
        {/* <VideoTitle title={original_title} overview={overview} /> */}
        <VideoBackGround Movieid={id}/>
        <SecondaryConatainer/>
       

    </div>
  )
}

export default MainContainer