// FlightCard.js içinde
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPlaneDeparture } from 'react-icons/fa'; // Uçak simgesi için
import "./index.css"

const FlightCard = ({ flight, getCountryByIata, reserveFlight }) => {
  const handleReserve = async () => {
    const userId = 'kullanici_id'; // Kullanıcı ID'sini alın (giriş yapan kullanıcıdan)
    await reserveFlight({
      flightName: flight.flightName,
      scheduleDate: flight.scheduleDate,
      scheduleTime: flight.scheduleTime,
      destinations: flight.route.destinations,
      userId
    });
  };

  return (
    <Card className="flight-card mb-3">
      <Card.Body className="d-flex flex-column justify-content-between p-4">
        {/* Uçak simgesi ve başlık */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FaPlaneDeparture size={24} color="#007bff" />
          <Card.Title className="flight-title">{flight.flightName}</Card.Title>
        </div>

        {/* Uçuş bilgileri */}
        <div className="flight-info mb-3">
          <p><strong>Date:</strong> {flight.scheduleDate}</p>
          <p><strong>Time:</strong> {flight.scheduleTime}</p>
          <p><strong>Route:</strong>{" "}
            {flight.route.destinations.map((destination, index) => (
              <span key={index}>
                {destination} {getCountryByIata(destination)}
                {index < flight.route.destinations.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Rezervasyon butonu */}
        <Button variant="success" className="mt-3 reserve-button" onClick={handleReserve}>
          Make a Reservation
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;
