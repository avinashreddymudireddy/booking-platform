import React from 'react';
import useOffers from '../hooks/useOffers';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import OfferCard from '../components/OfferCard';
import { Typography, Grid } from '@mui/material';

function Offers() {
  const { offers, loading, error, applyOffer } = useOffers();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Offers
      </Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <Grid container spacing={2}>
          {offers.map(o => (
            <Grid item key={o.id} xs={12} sm={6} md={4}>
              <OfferCard offer={o} onApply={applyOffer} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Offers;
