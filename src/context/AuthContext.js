import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
import { API_URL } from './authConfig';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWithAuth = async (url, options = {}) => {
    try {
      console.log('Making request to:', url);
      console.log('Request options:', options);

      const defaultOptions = {
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      // Add token to headers if it exists
      const token = localStorage.getItem('token');
      if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
      }

      // Merge options carefully to preserve headers
      const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...(options.headers || {})
        }
      };

      console.log('Final request options:', finalOptions);

      try {
        const response = await fetch(url, finalOptions);
        console.log('Response status:', response.status);
        
        // Log response headers for debugging
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        console.log('Response headers:', headers);

        return response;
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          console.error('Network error:', {
            url,
            error,
            apiUrl: API_URL,
            appUrl: APP_URL
          });
          throw new Error('Unable to connect to the server. Please check your connection and try again.');
        }
        throw error;
      }
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      console.log('Fetching profile with token:', token);
      const response = await fetchWithAuth(`${API_URL}/profile`);
      
      if (response.ok) {
        const userData = await response.json();
        console.log('Profile data:', userData);
        setUser(userData);
      } else {
        console.log('Profile fetch failed:', response.status);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  async function login(email, password) {
    try {
      console.log('Attempting login for:', email);
      console.log('Using API URL:', API_URL);
      
      const response = await fetchWithAuth(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      console.log('Login response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login response data:', data);
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('token');
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
