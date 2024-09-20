import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL_FLIGHTS = 'http://localhost:3001/flights'; // Backend URL for flights

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [errorFlights, setErrorFlights] = useState(null);

  // Uçuş verilerini alma
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(API_URL_FLIGHTS, {
          headers: {
            Accept: "application/json",
          }
        });
        setFlights(response.data.flights || []); // Eğer flights yoksa boş dizi ata
      } catch (error) {
        console.error('Failed to fetch flights:', error);
        setErrorFlights("Veriler çekilemedi!");
      } finally {
        setLoadingFlights(false);
      }
    };

    fetchFlights();
  }, []);

  

  if (errorFlights) return <p>{errorFlights}</p>;

  return (
    <div>
      <h1>Uçuş Bilgileri</h1>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.id}>
              {flight.flightName} - {flight.scheduleDate} - {flight.scheduleTime} - {flight.route.destinations}
            </li>
          ))
        ) : (
          <li>Uçuş bilgisi bulunamadı.</li>
        )}
      </ul>
     
    </div>
  );
  
};

export default Home;
