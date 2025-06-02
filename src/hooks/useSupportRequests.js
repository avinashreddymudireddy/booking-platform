import { useState } from 'react';

export default function useSupportRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function submitRequest(data) {
    setLoading(true);
    try {
      // simulate API call
      setRequests(prev => [...prev, { id: Date.now().toString(), ...data }]);
      setLoading(false);
      return { success: true };
    } catch (e) {
      setError('Failed to submit request');
      setLoading(false);
      return { success: false };
    }
  }

  return { requests, loading, error, submitRequest };
}
