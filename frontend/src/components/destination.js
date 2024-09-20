import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL_DESTINATIONS = 'http://localhost:3001/destinations'; // Update this line

const Destination = () => {
    const [destinations, setDestinations] = useState([]);
    const [loadingDestinations, setLoadingDestinations] = useState(true);
    const [errorDestinations, setErrorDestinations] = useState(null);

  // Uçuş verilerini alma
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(API_URL_DESTINATIONS, {
          headers: {
            Accept: "application/json",
          }
        });
        console.log(response.data); // API yanıtını konsola yazdır
        setDestinations(response.data.destinations || []); // Eğer destinations yoksa boş dizi ata
      } catch (error) {
        console.error('Failed to fetch destinations:', error.response ? error.response.data : error.message);
        setErrorDestinations("Veriler çekilemedi!");
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  // Destinasyon verilerini alma
  

  if (loadingDestinations) return <p>Veriler yükleniyor...</p>;
  if (errorDestinations) return <p>{errorDestinations}</p>;


  return (
    <div>
      <h1>Destinasyonlar</h1>
      <ul>
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <li key={destination.iata}>
              {destination.publicName.english} - {destination.country}
            </li>
          ))
        ) : (
          <li>Destinasyon bilgisi bulunamadı.</li>
        )}
      </ul>
    </div>
  );
  
};

export default Destination;
