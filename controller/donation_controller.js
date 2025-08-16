
const Donation = require("../db/donationdb");

exports.donation = async (req, res) => {
  try {
    const { paymentId, amount, donor } = req.body;
    const donation = new Donation({
      paymentId,
      amount,
      donor,
    });

    await donation.save();
    res.status(201).json({ message: "Donation saved successfully!" });
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ error: "Failed to save donation" });
  }
};


