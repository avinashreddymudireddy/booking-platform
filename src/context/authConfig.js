// This file contains authentication-related configuration
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Fallback to current window location in development
  if (process.env.NODE_ENV === 'development') {
    const port = '5002'; // Backend port
    return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
  }
  console.error('REACT_APP_API_URL is not set in .env file');
  return null;
};

const getAppUrl = () => {
  if (process.env.REACT_APP_URL) {
    return process.env.REACT_APP_URL;
  }
  // Fallback to current window location
  return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
};

export const API_URL = getApiUrl();
export const APP_URL = getAppUrl();
