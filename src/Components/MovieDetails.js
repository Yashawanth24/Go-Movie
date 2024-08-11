import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const API_OPTIONS = process.env.OPTIONS;
               const options = API_OPTIONS;

                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
                const castData = await castResponse.json();
                setCast(castData.cast || []);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return (
            <div className="text-red-500 text-center mt-4">
                <h2 className="text-2xl font-bold">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-gray-500 text-center mt-4">
                <h2 className="text-2xl font-bold">Loading...</h2>
                <p>Please wait while we fetch the movie details.</p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            position: 'relative',
        }}>
            <div className="text-white p-4 sm:p-6 rounded-lg max-w-5xl mx-auto">
                <div className="bg-gray-950 bg-opacity-80 p-4 sm:p-6 rounded-lg">
                    <header className="mb-6">
                       
                        <h1 className="text-3xl sm:text-4xl font-bold text-center">{movie.title}</h1>
                        <p className="text-lg sm:text-xl italic pt-2 text-gray-300 text-center">{movie.tagline || 'No tagline available'}</p>
                    </header>

                    <main className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                    alt={`${movie.title} Poster`}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="w-full md:w-3/4 space-y-4 py-2">
                                <p className="text-gray-200 text-base sm:text-lg">{movie.overview}</p>
                                <div className="space-y-2">
                                    <p><strong>Release Date:</strong> {movie.release_date || 'No release date available'}</p>
                                    <p><strong>Genres:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'No genres available'}</p>
                                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-4">
                            <h3 className="text-xl sm:text-2xl font-semibold">Cast</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {cast.length > 0 ? (
                                    cast.slice(0, 10).map(member => (
                                        <div key={member.cast_id} className="text-center">
                                            <img
                                                src={member.profile_path ? `https://image.tmdb.org/t/p/w185/${member.profile_path}` : '/path/to/default-image.jpg'}
                                                alt={member.name}
                                                className="rounded-lg w-16 sm:w-20 shadow-md mx-auto"
                                            />
                                            <p className="mt-2 text-gray-300 text-sm">{member.name}</p>
                                            <p className="text-gray-400 text-xs">{member.character}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No cast information available.</p>
                                )}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
