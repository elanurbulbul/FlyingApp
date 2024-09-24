// Home.js içinde
import React, { useEffect, useState } from "react";
import { Container, Spinner, Form, Button } from 'react-bootstrap'; // Import React Bootstrap components
import FlightList from '../components/FlightList'; // Import FlightList component

const API_URL_FLIGHTS = 'http://localhost:3001/flights';
const API_URL_DESTINATION = 'http://localhost:3001/destinations';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [errorFlights, setErrorFlights] = useState(null);
  const [errorDestinations, setErrorDestinations] = useState(null);
  const [visibleFlights, setVisibleFlights] = useState(20); // Initially show 20 flights
  const [filterDate, setFilterDate] = useState(''); // Filter date state
  const [filterDirection, setFilterDirection] = useState(''); // Filter direction state
  const [filteredFlights, setFilteredFlights] = useState([]); // State for filtered flights

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log('Fetching flights data...');
        const response = await fetch(API_URL_FLIGHTS);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('Flights data:', data);
        setFlights(data);
        setFilteredFlights(data); // Initialize filteredFlights with all flights
      } catch (error) {
        console.error('Error fetching flights:', error);
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
        console.log('Destinations data:', data);
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
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

  // Filter flights based on date and direction
  const handleFilter = () => {
    const newFilteredFlights = flights.filter(flight => {
      const isDateMatch = filterDate ? flight.scheduleDate === filterDate : true;
      const isDirectionMatch = filterDirection ? flight.flightDirection === filterDirection : true;
      return isDateMatch && isDirectionMatch;
    });
    setFilteredFlights(newFilteredFlights); // Update filteredFlights state
  };

  const reserveFlight = async (flightData) => {
    try {
      const response = await fetch('http://localhost:3001/flights/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });

      if (!response.ok) throw new Error('Rezervasyon yapılamadı');

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error(error);
      alert("Rezervasyon yapılırken bir hata oluştu.");
    }
  };

  if (loadingFlights || loadingDestinations) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="grow" />
      </div>
    );
  }
  if (errorFlights) return <p>{errorFlights}</p>;
  if (errorDestinations) return <p>{errorDestinations}</p>;

  return (
    <Container> 
      <h2 className="mt-5">FLIGHTS</h2>
      
      {/* Filtering Form */}
      <Form inline className="d-flex mb-3 align-items-center">
        <Form.Group controlId="formDate" className="me-3 d-flex align-self-center">
          <Form.Control 
            type="date" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)} // Update date filter state
          />
        </Form.Group>

        <Form.Group controlId="formDirection" className="me-3">
          <Form.Control 
            as="select" 
            value={filterDirection} 
            onChange={(e) => setFilterDirection(e.target.value)} // Update direction filter state
          >
            <option value="">All directions</option>
            <option value="ARR">Arrival</option>
            <option value="DEP">Departure</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleFilter} className="ml-2">
          Filter
        </Button>
      </Form>

      {/* Show filtered flights */}
      <FlightList
        flights={filteredFlights} // Pass the filtered flights to FlightList
        getCountryByIata={getCountryByIata}
        visibleFlights={visibleFlights}
        showMoreFlights={showMoreFlights}
        reserveFlight={reserveFlight} // Prop olarak geçir
      />
    </Container>
  );
};

export default Home;
