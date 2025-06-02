import React from 'react';

const EventCard = ({ event }) => (
  <div className="event-card">
    <h2>{event.title}</h2>
    <p>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
    <p>{event.description}</p>
  </div>
);

export default EventCard;
