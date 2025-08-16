const exp = require("express");
const app = exp();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expressFileupload = require("express-fileupload");
app.use(expressFileupload());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://subham:Mahiguru0718@cluster0.ciw3yiv.mongodb.net/Junglemahal?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Load Routes
const reviewRoutes = require("./routes/review_r");
app.use("/api", reviewRoutes);

const donationRoutes = require("./routes/donationRoutes.js");
app.use("/api", donationRoutes);

const bookingRoutes = require("./routes/booking_r.js");
app.use("/api", bookingRoutes);

const orderRoutes = require("./routes/order_r.js"); // <-- Make sure this file exists
app.use("/api", orderRoutes);

// ✅ ADD AUTH ROUTES HERE 
const authRoutes = require("./controller/login_controller.js");
app.use("/api/auth", authRoutes);

// ✅ PORT
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
