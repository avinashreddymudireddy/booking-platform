import React from 'react';
import useConcerts from '../hooks/useConcerts';
import ConcertCard from '../components/ConcertCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Typography } from '@mui/material';

function Concerts() {
  const { concerts, loading, error } = useConcerts();
  return (
    <>
      <Typography variant="h4" gutterBottom>Concerts</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="concerts-grid">
          {concerts.map(c => <ConcertCard key={c.id} concert={c} />)}
        </div>
      )}
    </>
  );
}

export default Concerts;
