import React, { useState, useEffect } from 'react';

const API_URL_DESTINATION= 'http://localhost:3001/destinations'

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API'den destinasyonları çeken fonksiyon
    const fetchDestinations = async () => {
      try {
        const response = await fetch(API_URL_DESTINATION);  // API'ye istek gönder
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDestinations(data);  // Gelen veriyi state'e kaydet
      } catch (err) {
        setError('Error fetching destinations');  // Hata durumunda error state'ini güncelle
        console.error(err);
      } finally {
        setLoading(false);  // Yükleme durumunu kapat
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
       
         {destinations.length > 0 ? (
          destinations.map((destination, index) => (
            <li key={index}>
            {destination.iata}-
            {destination.publicName.english} ({destination.country})
          </li>
          ))
        ) : (
          <li>Varıs bulunamadı.</li>
        )}
      </ul>
    </div>
  );
};

export default Destination;
