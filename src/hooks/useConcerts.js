import { useState, useEffect } from 'react';

export default function useConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/concerts.json')
      .then(res => res.json())
      .then(data => setConcerts(data))
      .catch(() => setError('Failed to load concerts'))
      .finally(() => setLoading(false));
  }, []);

  return { concerts, loading, error };
}
