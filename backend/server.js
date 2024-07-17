import express from 'express'
import dotenv from 'dotenv'



dotenv.config();
const app= express();
const port = process.env.PORT || 5000;


app.get('/',(req,res)=>res.send("server is ready"))

app.listen(port,(req,res)=>{
    console.log('Server started at port 8000')
})