const Reviewmod = require("../db/reviewdb");

exports.createReview = async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    const existingReview = await Reviewmod.findOne({ email });
    if (existingReview) {
      return res.status(400).json({ error: "You have already submitted a review with this email." });
    }
    const newReview = new Reviewmod({ name, email, rating, comments });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully!" });
  } catch (err) {
    console.error("Review submission error:", err);
    res.status(500).json({ error: "Failed to submit review" });
  }
};
