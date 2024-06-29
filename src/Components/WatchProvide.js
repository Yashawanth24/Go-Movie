import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from './Constants';
import { useParams } from 'react-router-dom';
import { addProviderName } from '../utils/movieSlice';

const WatchProvide = () => {
  const { movieId: urlMovieId } = useParams();
  const [indianProviders, setIndianProviders] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWatchProvider = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${urlMovieId}/watch/providers`, API_OPTIONS);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const indianProvider = data.results && data.results.IN && data.results.IN.flatrate;
        
        setIndianProviders(indianProvider);
        if (indianProvider && indianProvider.length > 0) {
          const firstProvider = indianProvider[0];
          if (firstProvider) {
            dispatch(addProviderName(firstProvider.provider_name));
          }
        }
      } catch (error) {
        console.error('Failed to fetch watch providers:', error);
      }
    };
  
    if (urlMovieId) {
      getWatchProvider();
    }
  }, [urlMovieId, dispatch]);

  return (
    <div>
      {indianProviders && (
        <ul>
          {indianProviders.map((provider) => (
            <li key={provider.provider_id}>{provider.provider_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchProvide;
