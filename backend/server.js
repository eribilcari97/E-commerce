import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authroute from "./routes/auth.route.js"
import productRoute from "./routes/products.route.js"
import cartRoute from "./routes/cart.route.js"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());//the body of the request
app.use(cookieParser())
connectDB();



app.use("/api/auth",authroute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);

app.listen(PORT,()=>{
    console.log("server is running");

})