const express = require("express");
const router = express.Router();
const { createReview } = require("../controller/review_controller");

router.post("/review", createReview); // ✅ POST only

module.exports = router;
