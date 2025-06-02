import { useState, useEffect } from 'react';

export default function useOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/offers.json')
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(() => setError('Failed to load offers'))
      .finally(() => setLoading(false));
  }, []);

  function applyOffer(id) {
    // mock apply logic
    alert(`Offer ${id} applied!`);
  }

  return { offers, loading, error, applyOffer };
}
