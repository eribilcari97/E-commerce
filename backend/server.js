import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authroute from "./routes/auth.route.js"
dotenv.config();

const app = express();
app.use(express());
connectDB();
const PORT = process.env.PORT || 5000;

app.use("/api/auth",authroute);

app.listen(PORT,()=>{
    console.log("server is running");

})