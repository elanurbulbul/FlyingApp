import React from 'react';

const FlightCard = ({ flight, getCountryByIata }) => {
  return (
    <div style={styles.card}>
      <h3>{flight.flightName}</h3>
      <p>Tarih: {flight.scheduleDate}</p>
      <p>Saat: {flight.scheduleTime}</p>
      <p>Rota: {flight.route.destinations.map((destination, index) => (
        <span key={index}>
          {destination} {getCountryByIata(destination)}
          {index < flight.route.destinations.length - 1 ? ', ' : ''}
        </span>
      ))}</p>
    </div>
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
