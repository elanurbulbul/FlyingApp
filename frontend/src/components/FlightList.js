// FlightList.js
import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ flights, getCountryByIata, visibleFlights, showMoreFlights }) => {
  return (
    <div>
      <div style={styles.listContainer}>
        {flights.slice(0, visibleFlights).map((flight) => (
          <FlightCard key={flight.id} flight={flight} getCountryByIata={getCountryByIata} />
        ))}
      </div>

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
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  showMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default FlightList;
