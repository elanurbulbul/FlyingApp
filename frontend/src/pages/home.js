import React, { useEffect, useState } from "react";
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
        const response = await fetch(API_URL_FLIGHTS);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
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
        const response = await fetch(API_URL_DESTINATION);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
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
    return `${destination.city}, ${destination.country}`;
  };

  // "Show More" butonuna tıklandığında görünür uçuş sayısını artıran fonksiyon
  const showMoreFlights = () => {
    setVisibleFlights(prevVisibleFlights => prevVisibleFlights + 10); 
  };

  if (loadingFlights || loadingDestinations) return <div>Loading...</div>;
  if (errorFlights) return <p>{errorFlights}</p>;
  if (errorDestinations) return <p>{errorDestinations}</p>;

  return (
    <div>
      <h1>Uçuş Bilgileri</h1>
      <FlightList
        flights={flights}
        getCountryByIata={getCountryByIata}
        visibleFlights={visibleFlights}
        showMoreFlights={showMoreFlights}
      />
    </div>
  );
};

export default Home;
