const express = require("express");
const router = express.Router();
const {donation}= require("../controller/donation_controller")
router.post("/donation",donation);
module.exports = router;