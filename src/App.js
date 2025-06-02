import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = React.lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./screens/Home'));
const Movies = lazy(() => import('./screens/Movies'));
const Concerts = lazy(() => import('./screens/Concerts'));
const Bookings = lazy(() => import('./screens/Bookings'));
const History = lazy(() => import('./screens/History'));
const Profile = lazy(() => import('./screens/Profile'));
const Search = lazy(() => import('./screens/Search'));
const Events = lazy(() => import('./screens/Events'));
const Offers = lazy(() => import('./screens/Offers'));
const Support = lazy(() => import('./screens/Support'));
const Login = lazy(() => import('./screens/Login'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/search" element={<Search />} />
          <Route path="/events" element={<Events />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
