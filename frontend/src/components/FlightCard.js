import React from 'react';
import { Card } from 'react-bootstrap';

const FlightCard = ({ flight, getCountryByIata }) => {
  return (
    <Card className='mb-3'>
      <Card.Body className='d-flex flex-row justify-content-between'>
      <Card.Title>{flight.flightName}</Card.Title>
        
        <p>Tarih: {flight.scheduleDate}</p>
        <p>Saat: {flight.scheduleTime}</p>
        <p>
          Rota:{" "}
          {flight.route.destinations.map((destination, index) => (
            <span key={index}>
              {destination} {getCountryByIata(destination)}
              {index < flight.route.destinations.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;
