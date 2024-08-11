import React, { useState, useEffect } from 'react';
import { POSTER_URL } from './Constants';
import { useNavigate } from 'react-router-dom';
import { SEARCH_URL } from './Constants';
const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const API_Key = process.env.Key;
 

  const getSearchMovie = async () => {
    
    try {
      const response = await fetch(`${SEARCH_URL}${query}&api_key=${API_Key}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`${SEARCH_URL}${query}&api_key=${API_Key}`);
      const data = await response.json();
      setSuggestions(data.results.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions();
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getSearchMovie();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title); 
    getSearchMovie(); 
    setSuggestions([]); 
  };

  const handleMovieClick = (movie) => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <p className="text-white mb-4 text-2xl">
        Discover endless entertainment. Easily <span className="text-yellow-400 text-2xl">find and compare streaming services</span> and never miss your favorite movies. From Hollywood blockbusters to Indian films, our app has it all.
      </p>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="cursor-pointer py-1 font-medium"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <ul className="flex space-x-4">
            {movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <li
                  key={movie.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden w-40 h-80 cursor-pointer flex-none"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`${POSTER_URL}${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-2 text-center">
                    <h2 className="text-sm font-medium">{movie.title}</h2>
                    <p className="text-gray-500 text-xs">{movie.release_date}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
