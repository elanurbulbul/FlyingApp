import React from 'react';
import FlightCard from './FlightCard';
import Stack from 'react-bootstrap/Stack';

const FlightList = ({ flights, getCountryByIata, visibleFlights, showMoreFlights, reserveFlight }) => {
  return (
    <div>
      <Stack gap={3}>
        {flights.slice(0, visibleFlights).map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            getCountryByIata={getCountryByIata}
            reserveFlight={reserveFlight} // Rezervasyon fonksiyonunu FlightCard'a geçir
          />
        ))}
      </Stack>

      {/* Show More butonunu ekle */}
      {visibleFlights < flights.length && (
        <button onClick={showMoreFlights} style={styles.showMoreButton}>
          Show More
        </button>
      )}
    </div>
  );
};

const styles = {
  showMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default FlightList;
