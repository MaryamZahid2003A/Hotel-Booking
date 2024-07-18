import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import db from './config/db.js';



dotenv.config();
const port = process.env.PORT || 5000;
db();
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.get('/',(req,res)=>res.send("server is ready"))

app.listen(port,(req,res)=>{
    console.log('Server started at port 8000')
})