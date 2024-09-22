const express = require('express');
const request = require('request');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

 const FLIGHTS_API_URL = 'https://api.schiphol.nl/public-flights/flights';
const DESTINATIONS_API_URL = 'https://api.schiphol.nl/public-flights/destinations';
const APP_ID = '08735cd9'; // Schiphol API App ID
const APP_KEY = '85ecd766959d1c784d8ec20c48a2deda'; // Schiphol API App Key
const RESOURCE_VERSION = 'v4';

app.use(cors());

//Uçuş verilerini alma endpoint'i

async function fetchAllFlights(page = 0, scheduleDate = '') {
  let flights = [];
  let currentPage = page;
  let nextPageUrl = `${FLIGHTS_API_URL}?page=${currentPage}&sort=%2BscheduleTime&includedelays=false`;

  if (scheduleDate) {
    nextPageUrl += `&scheduleDate=${scheduleDate}`;
  }

  while (nextPageUrl) {
    try {
      const response = await axios.get(nextPageUrl, {
        headers: {
          'Accept': 'application/json',
          'ResourceVersion': RESOURCE_VERSION,  // API sürümünü belirle
          'app_id': APP_ID,   // Gerekli ise app_id ekleyin
          'app_key': APP_KEY
        }
      });

      // Gelen sayfadaki ucusları kaydet
      flights = flights.concat(response.data.flights);

      // `Link` başlığında `next` var mı kontrol et
      const linkHeader = response.headers.link;
      const nextLink = parseLinkHeader(linkHeader, 'next');
      nextPageUrl = nextLink ? nextLink.url : null;  // Eğer `next` varsa URL'i al

    } catch (error) {
      console.error('Error fetching destinations:', error);
      break;
    }
  }

  return flights;
}

// Link başlığını çözümleyen fonksiyon
function parseLinkHeader(header, rel) {
  if (!header) return null;
  
  const links = header.split(',').map(link => {
    const parts = link.split(';');
    const url = parts[0].replace(/[<>]/g, '').trim();
    const relType = parts[1].split('=')[1].replace(/"/g, '').trim();
    return { url, rel: relType };
  });

  return links.find(link => link.rel === rel);
}

// API isteği için bir endpoint oluştur
app.get('/flights', async (req, res) => {
  const { scheduleDate } = req.query;  // Tarihi query parametresi ile al

  try {
    const flights = await fetchAllFlights();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});



// Destinasyon verilerini alma endpoint'i
async function fetchAllDestinations(page = 1) {
  let destinations = [];
  let currentPage = page;
  let nextPageUrl = `${DESTINATIONS_API_URL}?page=${currentPage}&sort=%2Biata`;

  while (nextPageUrl) {
    try {
      const response = await axios.get(nextPageUrl, {
        headers: {
          'ResourceVersion': RESOURCE_VERSION,  // API sürümünü belirle
          'app_id': APP_ID,   // Gerekli ise app_id ekleyin
          'app_key': APP_KEY
        }
      });

      // Gelen sayfadaki destinasyonları kaydet
      destinations = destinations.concat(response.data.destinations);

      // `Link` başlığında `next` var mı kontrol et
      const linkHeader = response.headers.link;
      const nextLink = parseLinkHeader(linkHeader, 'next');
      nextPageUrl = nextLink ? nextLink.url : null;  // Eğer `next` varsa URL'i al

    } catch (error) {
      console.error('Error fetching destinations:', error);
      break;
    }
  }

  return destinations;
}

// Link başlığını çözümleyen fonksiyon
function parseLinkHeader(header, rel) {
  if (!header) return null;
  
  const links = header.split(',').map(link => {
    const parts = link.split(';');
    const url = parts[0].replace(/[<>]/g, '').trim();
    const relType = parts[1].split('=')[1].replace(/"/g, '').trim();
    return { url, rel: relType };
  });

  return links.find(link => link.rel === rel);
}

// API isteği için bir endpoint oluştur
app.get('/destinations', async (req, res) => {
  try {
    const destinations = await fetchAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
