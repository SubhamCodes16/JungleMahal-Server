const User = require("../db/logindb"); // Your User model
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Use a secure secret, preferably from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

//================================================================
// 1. NEW: Middleware to verify the JSON Web Token
// This function will protect routes that require a user to be logged in.
//================================================================
const authMiddleware = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  
  // The header is expected to be in the format "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, send an "Unauthorized" status
  if (token == null) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid or expired, send a "Forbidden" status
      return res.status(403).json({ message: "Token is not valid" });
    }
    // If the token is valid, attach the user's ID from the token's payload to the request object
    req.userId = decoded.id;
    next(); // Proceed to the next middleware or the route handler
  });
};


// SIGN UP (Your existing code, no changes needed)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

//================================================================
// 2. UPDATED: Sign In route
// Now returns the user object along with the token, as the frontend expects.
//================================================================
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create a token containing the user's MongoDB document ID
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send back the token AND the user's details (excluding password)
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// FORGOT PASSWORD (Your existing code, no changes needed)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Logic for sending reset link goes here
    res.json({ message: "Reset link sent to your email (not implemented)" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

//================================================================
// 3. NEW: Protected route to get the logged-in user's profile
// This is the endpoint that your React component will fetch from.
//================================================================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Find the user by the ID that the authMiddleware attached to the request.
    // The .select('-password') part ensures the hashed password is not sent to the frontend.
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data back in the format the frontend expects: { user: { ... } }
    res.json({ user });

  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
