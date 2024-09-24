const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightName: { type: String, required: true },
  scheduleDate: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  route: {
    destinations: [{ type: String, required: true }],
  },
  userId: { type: String, required: true }, // Kullanıcının ID'si
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
