import cors from "cors";
import express from "express";
import cookieBarser from "cookie-parser";
import { connectDB } from "./config/DB.js";
const app = express();
app.use(express.json);
app.use(cookieBarser);
app.use(cors);
connectDB();
const PORT = 5000;
app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});
