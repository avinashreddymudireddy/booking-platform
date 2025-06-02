import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function OfferCard({ offer, onApply }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{offer.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {offer.description}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          {offer.discount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onApply(offer.id)}>Apply</Button>
      </CardActions>
    </Card>
  );
}

export default OfferCard;
