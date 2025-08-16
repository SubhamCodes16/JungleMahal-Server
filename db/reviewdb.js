const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  email:{
    type: String,
    unique: true,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  rating: Number,
  comments: String
});

module.exports = mongoose.model("Review", reviewSchema);
