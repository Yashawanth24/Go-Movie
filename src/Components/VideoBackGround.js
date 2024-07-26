import React, { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';
const VideoBackGround = ({ Movieid }) => {
  const nowPlayingMovies = useSelector(store => store.movies?.nowPlayingMovies || []);
  useMovieTrailer(Movieid);
  const [currentPosterIndex, setPosterIndex] = useState(0);
  
  const posterPaths = nowPlayingMovies
    .filter(movie => movie.poster_path)
    .map(movie => movie.poster_path);

  useEffect(() => {
    const interval = setInterval(() => {
      if (posterPaths.length === 0) return;
      setPosterIndex((index) => (index + 1) % posterPaths.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posterPaths.length]);

  if (posterPaths.length === 0) {
    return null;
  }

  return (
    <div className="bg-fixed">
      <img
        className="w-[46rem] h-[30rem]"
        src={`https://image.tmdb.org/t/p/w400${posterPaths[currentPosterIndex]}`}
        alt={`Movie poster ${currentPosterIndex + 1}`}
      />
    </div>
  );
};

export default VideoBackGround