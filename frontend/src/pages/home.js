import React, { useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap'; // React Bootstrap bileşenlerini import et
import FlightList from '../components/FlightList'; // FlightList bileşenini import et

const API_URL_FLIGHTS = 'http://localhost:3001/flights';
const API_URL_DESTINATION = 'http://localhost:3001/destinations';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [errorFlights, setErrorFlights] = useState(null);
  const [errorDestinations, setErrorDestinations] = useState(null);
  const [visibleFlights, setVisibleFlights] = useState(20);  // İlk etapta 20 uçuş göstereceğiz

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log('Fetching flights data...');
        const response = await fetch(API_URL_FLIGHTS);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('Flights data:', data); // Uçuş verilerini burada konsola yazdır
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error); // Hataları da yazdır
        setErrorFlights("Uçuş verileri çekilemedi!");
      } finally {
        setLoadingFlights(false);
      }
    };
  
    fetchFlights();
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        console.log('Fetching destinations data...');
        const response = await fetch(API_URL_DESTINATION);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('Destinations data:', data); // Destinasyon verilerini burada konsola yazdır
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error); // Hataları da yazdır
        setErrorDestinations("Destinasyon verileri çekilemedi!");
      } finally {
        setLoadingDestinations(false);
      }
    };
  
    fetchDestinations();
  }, []);

  const getCountryByIata = (iataCode) => {
    const destination = destinations.find(dest => dest.iata === iataCode);
    if (!destination) {
      console.warn(`IATA code ${iataCode} için eşleşme bulunamadı!`);
      return '';
    }
    return `(${destination.city}, ${destination.country})`;
  };

  const showMoreFlights = () => {
    setVisibleFlights(prevVisibleFlights => prevVisibleFlights + 10); 
  };

  if (loadingFlights || loadingDestinations) return <div>Loading...</div>;
  if (errorFlights) return <p>{errorFlights}</p>;
  if (errorDestinations) return <p>{errorDestinations}</p>;

  return (
    <Container  fluid="md"> 
      <h1>Uçuş Bilgileri</h1>
      <FlightList
        flights={flights}
        getCountryByIata={getCountryByIata}
        visibleFlights={visibleFlights}
        showMoreFlights={showMoreFlights}
      />
      {visibleFlights < flights.length && (
        <Button variant="primary" onClick={showMoreFlights}>Daha Fazla Göster</Button>
      )}
    </Container>
  );
};

export default Home;
