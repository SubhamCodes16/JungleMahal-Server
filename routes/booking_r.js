const express = require("express");
const router = express.Router();
const {booking}= require("../controller/booking_controller");
router.post("/booking",booking);
module.exports = router;