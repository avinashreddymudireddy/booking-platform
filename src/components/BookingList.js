import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

function BookingList({ bookings, onCancel }) {
  return (
    <List>
      {bookings.map(b => (
        <ListItem key={b.id} divider>
          <ListItemText
            primary={`Booking ID: ${b.id}`}
            secondary={`Status: ${b.status}`}
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" color="secondary" onClick={() => onCancel(b.id)}>
              Cancel
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default BookingList;
