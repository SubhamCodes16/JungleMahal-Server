const Order = require("../db/orderdb.js");

exports.saveOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Order save error:", error);
    res.status(500).json({ message: "Failed to save order" });
  }
};