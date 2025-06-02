import React from 'react';
import useEvents from '../hooks/useEvents';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Carousel from '../components/Carousel';
import { Typography } from '@mui/material';
import BentoDemo from '../components/BentoDemo';

function Home() {
  const { events, loading, error } = useEvents();
  return (
    <>
      <Typography variant="h4" gutterBottom>Welcome to Booking Platform</Typography>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {/* Map events to carousel items with specific banners */}
          {(() => {
            const imageMap = { '1': '/images/banner1.png', '2': '/images/banner2.png' };
            const carouselItems = events.map(evt => ({
              image: imageMap[evt.id] || '/images/banner1.png',
              alt: evt.title,
              title: evt.title,
              buttonText: 'Learn More',
              href: '/events'
            }));
            return <Carousel items={carouselItems} />;
          })()}
          <BentoDemo />
        </>
      )}
    </>
  );
}

export default Home;
