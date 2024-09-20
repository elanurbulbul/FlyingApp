const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = 3001;

 const FLIGHTS_API_URL = 'https://api.schiphol.nl/public-flights/flights';
const DESTINATIONS_API_URL = 'https://api.schiphol.nl/public-flights/destinations';
const APP_ID = 'ad4395f8'; // Schiphol API App ID
const APP_KEY = 'b14cd532f0ab637b95427fc7097e361f'; // Schiphol API App Key
const RESOURCE_VERSION = 'v4';

app.use(cors());

//Uçuş verilerini alma endpoint'i
app.get('/flights', (req, res) => {
  request({
    url: FLIGHTS_API_URL,
    headers: {
      'Accept': 'application/json',
      'app_id': APP_ID,
      'app_key': APP_KEY,
      'ResourceVersion': RESOURCE_VERSION
    }
  }).pipe(res).on('error', err => {
    console.error('Request failed:', err);
    res.status(500).send('Request failed');
  });
 });

// Destinasyon verilerini alma endpoint'i
app.get('/destinations', (req, res) => { // /api/destinations yolunu kullanın
  request({
    url: DESTINATIONS_API_URL,
    headers: {
      'Accept': 'application/json',
      'app_id': APP_ID,
      'app_key': APP_KEY,
      'ResourceVersion': RESOURCE_VERSION
    }
  }, (error, response, body) => {
    if (error) {
      console.error('Request failed:', error);
      return res.status(500).send('Request failed');
    }

    try {
      const data = JSON.parse(body);
      console.log(data); // API yanıtını konsola yazdır
      res.json(data); // Veriyi istemciye gönder
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Error parsing data');
    }
  });
});


app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
