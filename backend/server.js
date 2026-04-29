import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authroute from "./routes/auth.route.js"
const app = express();
app.use(express());

const PORT = process.env.PORT || 5000;

app.use("/api/auth",authroute);

app.listen(PORT,()=>{
    console.log("server is running");

})