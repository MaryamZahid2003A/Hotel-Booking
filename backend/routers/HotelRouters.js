import express from 'express';
import { my_hotel, view_hotel } from '../controller/HotelController.js';
import { protect } from '../Middleware/authMiddleWare.js';

const router = express.Router();
router.post('/', protect, my_hotel);
router.get('/view/:id', protect, view_hotel); 
export default router;
