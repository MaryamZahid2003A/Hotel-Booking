import expressAsyncHandler from "express-async-handler";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel from "../models/HotelModel.js";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    }
}).array('imageFiles', 6); // Limit to 6 files

const my_hotel = expressAsyncHandler(async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).send({ message: err.message });
        }

        try {
            console.log("Files received:", req.files); // Debugging statement
            const imageFiles = req.files;

            if (!imageFiles || imageFiles.length === 0) {
                return res.status(400).send({ message: 'No image files uploaded' });
            }

            const {
                name, city, country, description, type,
                adultCount, childCount, facilities, pricePerNight, starRating
            } = req.body;

            // Convert and upload images to Cloudinary
            const PromiseUrl = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString('base64');
                const imgURL = 'data:' + image.mimetype + ';base64,' + b64;
                const uploadResult = await cloudinary.uploader.upload(imgURL);
                return uploadResult.url;
            });

            const imageURLS = await Promise.all(PromiseUrl);

            // Create new hotel in the database
            const newHotel = await Hotel.create({
                userId: req.user._id,
                name,
                city,
                country,
                description,
                type,
                adultCount,
                childCount,
                facilities,
                pricePerNight,
                starRating,
                imageurls: imageURLS,
                lastUpdated: new Date()
            });

            if (newHotel) {
                res.status(200).json(newHotel);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        } catch (error) {
            console.error('Error in Hotel Creation:', error);
            res.status(400).json({ message: 'Error in Hotel Creation' });
        }
    });


  
});

const view_hotel=expressAsyncHandler(async(req,res)=>{
    const view_hotel= await Hotel.find(req.userId)
    res.status(200).json(view_hotel)
})

export { my_hotel,view_hotel };
