import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackGround from './VideoBackGround'
import VideoTitle from './VideoTitle'
import SecondaryConatainer from './SecondaryConatainer'
import MovieStremers from './MovieStremers'
import SearchMovie from './SearchMovie'
import Header from './Header'
import Footer from './Footer'
const MainContainer = () => {
  const movie=useSelector(store=> store?.movies?.nowPlayingMovies);
  
  if(!movie)return;
  const MainMovies=movie[0];

  const{original_title,overview,id}=MainMovies;

  return (
    <div>
    <Header/>
    <div className="flex flex-wrap justify-center py-4 bg-blue-800 px-2">
      <div className="w-1/2 bg-black p-4">
        <SearchMovie />
      </div>
      <div className="w-1/2 bg-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-500 p-2">
        <VideoBackGround Movieid={id} />
      </div>
      <div className='overflow-x-scroll'>
      <SecondaryConatainer />
      </div>
    </div>
    <Footer/>
    </div>
  );

};

export default MainContainer