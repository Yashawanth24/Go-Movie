import React, { useState, useEffect } from 'react';
import { POSTER_URL } from './Constants';
import { useNavigate} from 'react-router-dom';

const SearchMovie = ({ onClick }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_KEY = 'ba71c4377129fbf8f25898b54289c778';
  const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=';

  const getSearchMovie = async () => {
    try {
      const response = await fetch(`${SEARCH_URL}${query}&api_key=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial search can be done here if needed
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getSearchMovie();
  };
 const handleMovieClick=(movie)=>{
  navigate(`/watch/${movie.id}`);
 }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-white shadow-md rounded-lg overflow-hidden w-40 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              {movie.poster_path ? (
                <img
                  src={`${POSTER_URL}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="w-40 h-60 object-cover mb-4"
                />
              ) : (
                <p className="w-40 h-60 flex items-center justify-center bg-gray-200 mb-4">No image available</p>
              )}
              <div className="p-2 text-center">
                <h2 className="text-sm font-medium">{movie.title}</h2>
                <p className="text-gray-500 text-xs">{movie.release_date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovie;
