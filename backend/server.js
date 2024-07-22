import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import db from './config/db.js';
import router from './routers/UserRouters.js';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret_secret:process.env.CLOUDINARY_API_SECRET,
})
dotenv.config();
const port = process.env.PORT || 5000;
db();
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/',(req,res)=>res.send("server is ready"))
app.use('/api/users',router)

app.listen(port,(req,res)=>{
    console.log('Server started at port 8000')
})