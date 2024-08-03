import expressAsyncHandler from "express-async-handler";
import Booking from "../models/BookingModel.js"; 
import generateToken from "../utilis/generateToken.js";

const book = expressAsyncHandler(async (req, res) => {
    const { hotelId, userId, firstName, lastName,email, night,checkIn,checkOut} = req.body;
    try {
        const newBooking = await Booking.create({
            userId,
            hotelId,
            firstName,
            lastName,
            email,
            night,
            checkIn,
            checkOut
        });

        if (newBooking) {
            generateToken(res, newBooking._id);
            res.status(200).json(newBooking);
        }
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: "Error In Booking", error: error.message }); 
    }
});

export { book };
