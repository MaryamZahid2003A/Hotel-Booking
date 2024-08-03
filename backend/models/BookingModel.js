import mongoose from "mongoose";

const bookingSchema=mongoose.Schema({
    hotelId:{type:String, required:true},
    userId :{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    night:{type:Number,required:true},
    checkIn:{type:String,required:true},
    checkOut:{type:String,required:true},
})

const Booking=mongoose.model('booking',bookingSchema)
export default Booking;