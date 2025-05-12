import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import userRouter from './routers/UserRouters.js';
import hotelRouter from './routers/HotelRouters.js';
import SearchRouter from './routers/SearchRouter.js';
import { v2 as cloudinary } from 'cloudinary';
import BookRouter from './routers/BookRouter.js';
import cors from "cors";

dotenv.config();




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = 5000;
db();

const app = express();
app.use(
  cors({
    origin: "http://18.205.235.146:3000", // your frontend URL
    credentials: true, // allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => res.send("server is ready"));
app.use('/api/hotel', hotelRouter);
app.use('/api/users', userRouter);
app.use('/api/search', SearchRouter);
app.use('/api/booking',BookRouter)


try {
    app.listen(port,'0.0.0.0',() => {
        console.log(`✅ Server started at port ${port}`);
    });
} catch (err) {
    console.error("❌ Server start error:", err.message);
}

