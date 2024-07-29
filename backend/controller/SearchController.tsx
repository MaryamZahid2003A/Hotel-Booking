import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Hotel from "../models/HotelModel.js";
import { HotelSearch } from './Type.tsx';

const SearchPage = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNo = parseInt(req.query.page ? req.query.page.toString() : '1');
        const skip = (pageNo - 1) * pageSize;
        
        const hotels = await Hotel.find().skip(skip).limit(pageSize); 
        const total = await Hotel.countDocuments();
        
        const response: HotelSearch = {
            data: hotels,
            pagination: {
                total,
                page: pageNo,
                pages: Math.ceil(total / pageSize)
            }
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export {SearchPage};
