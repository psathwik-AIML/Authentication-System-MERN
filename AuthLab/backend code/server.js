const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const authRouter = require("./routes/authRoutes");
const app = express();
// middlewares
app.use(express.json());
app.use(cors());
// database connection
connectDB();
// routes
app.use("/api/auth", authRouter);
const PORT = process.env.PORT || 5000;
// server activation
app.listen(PORT, () => console.log("Server is running on port :", PORT));
