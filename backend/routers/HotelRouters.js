import express from 'express';
import { my_hotel, view_hotel,edit_hotel,view_specific_hotel  } from '../controller/HotelController.js';
import { protect } from '../Middleware/authMiddleWare.js';
import { Book_view_hotel } from "../controller/HotelController.js";


const router = express.Router();
router.post('/', protect, my_hotel);
router.get('/view/:id', protect, view_hotel); 
router.route('/check/:id/:hotelId').put(protect,edit_hotel).get(protect,view_specific_hotel);
router.get('/MyBooking/:id',protect,Book_view_hotel);



export default router;
