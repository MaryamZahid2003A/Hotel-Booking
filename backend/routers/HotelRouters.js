import express from 'express';
import { my_hotel } from '../controller/HotelController.js';
import { protect } from '../Middleware/authMiddleWare.js';

const routers = express.Router();
routers.post('/', protect, my_hotel);

export default routers;