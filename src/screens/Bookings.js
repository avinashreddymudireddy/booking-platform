import React from 'react';
import useBookings from '../hooks/useBookings';
import BookingList from '../components/BookingList';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Typography } from '@mui/material';

function Bookings() {
  const { bookings, loading, error, cancelBooking } = useBookings();
  return (
    <>
      <Typography variant="h4" gutterBottom>Your Bookings</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <BookingList bookings={bookings} onCancel={cancelBooking} />
      )}
    </>
  );
}

export default Bookings;
