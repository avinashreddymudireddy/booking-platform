import React from 'react';
import useEvents from '../hooks/useEvents';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

function Events() {
  const { events, loading, error } = useEvents();
  const imageMap = { '1': '/images/banner1.png', '2': '/images/banner2.png' };
  return (
    <>
      <Typography variant="h4" gutterBottom>Events</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <Grid container spacing={2}>
          {events.map(evt => (
            <Grid item key={evt.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={imageMap[evt.id] || '/images/banner1.png'}
                  alt={evt.title}
                />
                <CardContent>
                  <Typography variant="h6">{evt.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(evt.date).toLocaleDateString()} - {evt.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Events;
