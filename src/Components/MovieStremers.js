import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_OPTIONS, IMG_CON_URL } from './Constants';

const MovieStreamers = () => {
  const { movieId } = useParams();
  const [providers, setProviders] = useState([]);
  const [providerImages, setProviderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOttProvider = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=ba71c4377129fbf8f25898b54289c778`);
      const data = await response.json();
      
      // Aggregate providers from all countries
      const allProviders = [];
      for (const countryCode in data.results) {
        if (data.results[countryCode]) {
          allProviders.push(...(data.results[countryCode].buy || []));
          allProviders.push(...(data.results[countryCode].flatrate || []));
          allProviders.push(...(data.results[countryCode].rent || []));
        }
      }
      
      // Remove duplicates
      const uniqueProviders = Array.from(new Map(allProviders.map(provider => [provider.provider_name, provider])).values());
      const providerNames = uniqueProviders.map(provider => provider.provider_name);
      const providerImages = uniqueProviders.map(provider => provider.logo_path);

      setProviders(providerNames);
      setProviderImages(providerImages);
    } catch (error) {
      console.error('Failed to fetch OTT providers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      getOttProvider();
    }
  }, [movieId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Streaming Providers</h1>

      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
              <span className="w-32 h-6 bg-gray-300 rounded-md"></span>
            </li>
          ))}
        </ul>
      ) : providers.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider, index) => (
            <li key={index} className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4">
              <div>
                {providerImages[index] && (
                  <img
                    className="w-16 h-16 object-contain"
                    src={`${IMG_CON_URL}${providerImages[index]}`}
                    alt={provider}
                  />
                )}
              </div>
              <span className="text-lg font-medium">{provider}</span>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-xl text-center text-gray-500">No streaming providers available</h2>
      )}
    </div>
  );
};

export default MovieStreamers;
