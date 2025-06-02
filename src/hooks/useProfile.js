import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch('/data/users.json')
      .then(res => res.json())
      .then(data => setProfile(data[user.id]))
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, [user]);

  return { profile, loading, error };
}
