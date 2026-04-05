const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const sosRoutes = require("./routes/sosRoutes");

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});