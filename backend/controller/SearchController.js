import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/HotelModel.js";

const SearchPage = expressAsyncHandler(async (req, res) => {
    try {
        const pageSize = 5;
        const pageNo = parseInt(req.query.page ? req.query.page.toString() : '1');
        const skip = (pageNo - 1) * pageSize;
        
        const hotels = await Hotel.find().skip(skip).limit(pageSize); 
        const total = await Hotel.countDocuments();
        
        const response= {
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
