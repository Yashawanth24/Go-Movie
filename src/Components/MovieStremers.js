import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMG_CON_URL } from './Constants';
import { API_Key } from './Constants';

const ISO_COUNTRY_CODES = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 
  'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 
  'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 
  'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 
  'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 
  'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 
  'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 
  'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 
  'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 
  'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 
  'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 
  'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TZ', 'UA', 'UG', 'UM', 
  'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
];

const MovieStreamers = () => {
  const { movieId } = useParams();
  const [providers, setProviders] = useState([]);
  const [providerImages, setProviderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const getOttProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_Key}`);
      const data = await response.json();

      const countryProviders = data.results[selectedCountry] || {};
      const allProviders = [
        ...(countryProviders.buy || []),
        ...(countryProviders.flatrate || []),
        ...(countryProviders.rent || [])
      ];
      const providerNames = allProviders.map(provider => provider.provider_name);
      const providerImages = allProviders.map(provider => provider.logo_path);

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
  }, [movieId, selectedCountry]);

  return (
    <div className="text-white p-4 rounded-lg max-w-full mx-auto bg-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-center">Streaming Providers</h1>

      <div className="mb-6 flex justify-center">
        <label htmlFor="country" className="block text-lg font-medium mr-4">Select Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="block pl-3 pr-10 py-2 bg-gray-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm rounded-md"
        >
          {ISO_COUNTRY_CODES.map(code => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex items-center space-x-4 p-6 bg-gray-800 shadow-md rounded-lg animate-pulse">
              <div className="w-16 h-16 bg-gray-700 rounded-md"></div>
              <div className="w-32 h-6 bg-gray-700 rounded-md"></div>
            </li>
          ))}
        </ul>
      ) : providers.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider, index) => (
            <li key={index} className="flex items-center space-x-4 p-4 bg-gray-800 shadow-md rounded-lg">
              <div>
                {providerImages[index] && (
                  <img
                    className="w-12 h-12 object-contain rounded-md"
                    src={`${IMG_CON_URL}${providerImages[index]}`}
                    alt={provider}
                  />
                )}
              </div>
              <span className="text-sm font-medium text-white">{provider}</span>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-xl text-center text-gray-400">No streaming providers available</h2>
      )}
    </div>
  );
};

export default MovieStreamers;
