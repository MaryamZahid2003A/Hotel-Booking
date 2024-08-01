import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/HotelModel.js";

const SearchPage = expressAsyncHandler(async (req, res) => {
    try {
        const query=constructSearchQuery(req.query);

        const sortOption={}
        switch(sortOption){
            case "starRating":
                sortOption={starRating:-1}
                break;
            case "LowToHigh":
                sortOption={pricePerNight: 1}
                break;
            case "HighToLow":
                sortOption={pricePerNight: -1}
                break;
        }
        const pageSize = 5;
        const pageNo = parseInt(req.query.page ? req.query.page.toString() : '1');
        const skip = (pageNo - 1) * pageSize;


        
        const hotels = await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize); 
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

const constructSearchQuery=(queryParam)=>{
    let constructQuery={}
    if (queryParam.adultCount){
        constructQuery.adultCount={
            $gte:parseInt(queryParam.adultCount)
        }
    }
    if (queryParam.childCount){
        constructQuery.childCount={
            $gte:parseInt(queryParam.childCount)
        }
    }
    if (queryParam.facilities){
        constructQuery.facilities={
           $all: Array.isArray(queryParam.facilities)?  queryParam.facilities : [queryParam.facilities]
        }
    }
    if (queryParam.types){
        constructQuery.types={
           $in: Array.isArray(queryParam.types)?  queryParam.types : [queryParam.types]
        }
    }
    if (queryParam.starRating){
        constructQuery.starRating={
           $eq: Array.isArray(queryParam.starRating)?  parseInt(queryParam.starRating): queryParamstarRating.map((star)=>(parseInt(star)))
        }
    }
    if (queryParam.maxPrice){
        constructQuery.maxPrice={
           $lte: parseInt(queryParam.maxPrice)
        }
    }
    return constructQuery
}
export {SearchPage};
