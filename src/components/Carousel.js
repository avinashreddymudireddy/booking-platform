import React, { useState, useEffect } from 'react';

function Carousel({ items: propItems }) {
  const defaultItems = [
    { image: '/images/banner1.png', alt: 'Featured Event Banner', title: 'Featured Event', buttonText: 'Book Now' },
    { image: '/images/banner2.png', alt: 'Upcoming Concert Banner', title: 'Upcoming Concert', buttonText: 'Learn More' }
  ];

  const items = propItems && propItems.length ? propItems : defaultItems;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % items.length);
  };

  const handleIndicatorClick = index => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      {items.map((item, index) => (
        <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
          <img src={item.image} alt={item.alt} />
          <div className="overlay">
            <h2>{item.title}</h2>
            <button onClick={() => item.href && (window.location.href = item.href)}>
              {item.buttonText}
            </button>
          </div>
        </div>
      ))}
      <div className="carousel-controls">
        <span className="prev" onClick={handlePrev}>&#10094;</span>
        <span className="next" onClick={handleNext}>&#10095;</span>
      </div>
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
