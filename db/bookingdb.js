const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  adults: Number,
  children: Number,
  nights: Number,
  meals: { type: mongoose.Schema.Types.Mixed, default: {} },
  total: String,
  bookingTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);