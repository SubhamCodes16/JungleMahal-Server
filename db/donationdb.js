const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  paymentId: String,
  amount: Number,
  donor: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
