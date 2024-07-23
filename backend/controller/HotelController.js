import expressAsyncHandler from "express-async-handler";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel from "../models/HotelModel.js";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
}).array('imageFiles', 6);

const my_hotel = expressAsyncHandler(async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        try {
            const imageFiles = req.files;
            const { userId, name, city, country, description, type, adultCount, childCount, facilities, pricePerNight, starRating, imageurls, lastUpdated } = req.body;

            const PromiseUrl = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString('base64');
                const imgURL = 'data:' + image.mimetype + ';base64,' + b64;
                const uploadResult = await cloudinary.uploader.upload(imgURL);
                return uploadResult.url;
            });

            const imageURLS = await Promise.all(PromiseUrl);
            
            const newHotel = await Hotel.create({
                userId: req.user.id,
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
                res.status(200).json({
                    userId: newHotel.userId,
                    name: newHotel.name,
                    city: newHotel.city,
                    country: newHotel.country,
                    description: newHotel.description,
                    type: newHotel.type,
                    adultCount: newHotel.adultCount,
                    childCount: newHotel.childCount,
                    facilities: newHotel.facilities,
                    pricePerNight: newHotel.pricePerNight,
                    starRating: newHotel.starRating,
                    imageurls: newHotel.imageurls,
                    lastUpdated: newHotel.lastUpdated
                });
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        } catch (error) {
            console.error('Error in Hotel Creation:', error);
            res.status(400).json({ message: 'Error in Hotel Creation' });
        }
    });
});

export { my_hotel };
