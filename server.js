const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/jobs", require("./routes/api/jobs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
