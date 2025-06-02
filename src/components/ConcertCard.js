import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ConcertCard({ concert }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{concert.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(concert.date).toLocaleDateString()} - {concert.location}
        </Typography>
        <Typography variant="body2">{concert.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ConcertCard;
