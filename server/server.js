// server.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5555;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello anchors.in!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
