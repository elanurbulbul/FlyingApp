
import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const MyFlights = ({ userId }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyFlights = async () => {
      try {
        const response = await fetch(`http://localhost:3001/flights/my-flights/${userId}`);
        if (!response.ok) throw new Error('Rezervasyonlar alınamadı');
        
        const data = await response.json();
        setFlights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFlights();
  }, [userId]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h2>Rezervasyonlarım</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            {flight.flightName} - {flight.scheduleDate} - {flight.scheduleTime}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default MyFlights;
