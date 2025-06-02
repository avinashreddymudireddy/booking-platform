import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function MovieCard({ movie }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Release Date: {new Date(movie.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">{movie.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
