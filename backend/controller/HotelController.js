import expressAsyncHandler from "express-async-handler";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel from "../models/HotelModel.js";
import Booking from "../models/BookingModel.js";
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



const Book_view_hotel = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const hotels = await Booking.find({ userId: id });
    if (!hotels) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(400).json({ message: 'Cannot give booking data', error: error.message });
  }
});

const view_hotel = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(`router id:  by view${id}`);
    try {
      const hotels = await Hotel.find({ userId: id });
      if (hotels.length > 0) {
        res.status(200).json(hotels);
      } else {
        res.status(404).json({ message: 'Hotels not found' });
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  const view_specific_hotel = expressAsyncHandler(async (req, res) => {
    const { hotelId } = req.params;

    console.log(`router id:  by booking${hotelId}`);
    try {
      const hotel = await Hotel.findById(hotelId); 
      console.log('hello')
      console.log(hotel)
      res.status(200).json(hotel)
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

 
  const edit_hotel = expressAsyncHandler(async (req, res) => {
    const { hotelId } = req.params;
    console.log(`Hotel ID: ${hotelId}`);
  
    try {
      const hotel = await Hotel.findById(hotelId); 
  
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
 
      hotel.name = req.body.name || hotel.name;
      hotel.city = req.body.city || hotel.city;
      hotel.country = req.body.country || hotel.country;
      hotel.description = req.body.description || hotel.description;
      hotel.type = req.body.type || hotel.type;
      hotel.adultCount = req.body.adultCount || hotel.adultCount;
      hotel.childCount = req.body.childCount || hotel.childCount;
      hotel.facilities = req.body.facilities || hotel.facilities;
      hotel.pricePerNight = req.body.pricePerNight || hotel.pricePerNight;
      hotel.starRating = req.body.starRating || hotel.starRating;
      hotel.imageurls = req.body.imageurls || hotel.imageurls;
      hotel.lastUpdated = new Date();
  
      // Save updated hotel
      const updatedHotel = await hotel.save();
  
      res.status(200).json(updatedHotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  
export { my_hotel,view_hotel,edit_hotel,view_specific_hotel,Book_view_hotel };