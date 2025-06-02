import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import ToggleColorMode from './ToggleColorMode';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ToggleColorMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ToggleColorMode>
    </AuthProvider>
  </BrowserRouter>
);
