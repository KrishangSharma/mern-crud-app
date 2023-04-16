const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// ROUTES
const registerRoute = require("./routes/auth");
const marksRoute = require("./routes/marks");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// APP ROUTES
app.use("/api/user", registerRoute);
app.use("/api/marks", marksRoute);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
