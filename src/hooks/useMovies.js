import { useState, useEffect } from 'react';

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/movies.json')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(() => setError('Failed to load movies'))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
}
