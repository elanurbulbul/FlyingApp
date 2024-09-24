import React from 'react';
import { Card } from 'react-bootstrap';

const FlightCard = ({ flight, getCountryByIata }) => {
  return (
    <Card className='flex justify-content-between' style={styles.card}>
      <h3>{flight.flightName}</h3>
      <p>Tarih: {flight.scheduleDate}</p>
      <p>Saat: {flight.scheduleTime}</p>
      <p>Rota: {flight.route.destinations.map((destination, index) => (
        <span key={index}>
          {destination} {getCountryByIata(destination)}
          {index < flight.route.destinations.length - 1 ? ', ' : ''}
        </span>
      ))}</p>
    </Card>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
    width: '300px',
    textAlign: 'center',
  },
};

export default FlightCard;
