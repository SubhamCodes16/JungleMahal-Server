const Booking= require("../db/bookingdb");
exports.booking=async(req, res) => {
    try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving booking' });
  }
};
