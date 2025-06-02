import { useState, useEffect } from 'react';

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/bookings.json')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  function cancelBooking(id) {
    setBookings(prev => prev.filter(b => b.id !== id));
    // Mock cancellation feedback
  }

  return { bookings, loading, error, cancelBooking };
}
