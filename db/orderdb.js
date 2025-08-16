const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      totalAmount: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);