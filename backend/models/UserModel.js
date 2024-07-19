import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const schema= mongoose.Schema({
        name :{
            type: String,
            required : true
        },
        password : {
            type: String,
            required : true
        },
        email : {
            type: String ,
            required: true,
            unique:true
        }
} , {
    timestamps :true
})

schema.pre ('save',async function(next){
    if (this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12)
    }
    next();
})


schema.methods.checkPassword= async function(Entered){
    return await bcrypt.compare(Entered,this.password)
}

const User=  mongoose.model('User',schema)

export default User;