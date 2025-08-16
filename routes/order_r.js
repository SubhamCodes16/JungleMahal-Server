const express = require("express");
const router = express.Router();
const { saveOrder } = require("../controller/order_controller");

router.post("/order", saveOrder); // POST /api/order

router.get("/", (req, res) => {
  res.send("Order route is working!");
});

module.exports = router;