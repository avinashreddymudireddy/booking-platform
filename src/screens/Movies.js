import React from 'react';
import useMovies from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Typography } from '@mui/material';

function Movies() {
  const { movies, loading, error } = useMovies();
  return (
    <>
      <Typography variant="h4" gutterBottom>Movies</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="movies-grid">
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </>
  );
}

export default Movies;
