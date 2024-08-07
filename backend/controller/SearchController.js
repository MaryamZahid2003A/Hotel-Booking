import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/HotelModel.js";

const SearchPage = expressAsyncHandler(async (req, res) => {
    try {
        const query=constructSearchQuery(req.query);

       let sortOption={}
       switch(req.query.sortOption){
        case "starRating":
            sortOption={starRating:-1}
            break;
        case "LowToHigh":
            sortOption={pricePerNight:1}
            break;
        case "HighToLow":
            sortOption={pricePerNight:-1}
            break;
       }
        const pageSize = 5;
        const pageNo = parseInt(req.query.page ? req.query.page.toString() : '1');
        const skip = (pageNo - 1) * pageSize;


        
        const hotels = await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize); 
        const total = await Hotel.countDocuments(query);
        
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
    if (queryParam.destination) {
        constructQuery.$or = [
          { city: new RegExp(queryParam.destination, "i") },
          { country: new RegExp(queryParam.destination, "i") },
        ];
      }
    
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
    if (queryParam.Types){
        constructQuery.Types={
           $in: Array.isArray(queryParam.Types)? [queryParam.Types]: queryParam.Types
        }
    }
    if (queryParam.starRating) {
        constructQuery.starRating = {
          $in: Array.isArray(queryParam.starRating) ? queryParam.starRating.map(star => parseInt(star)) : [parseInt(queryParam.starRating)]
        };
      }
    if (queryParam.maxPrice){
        constructQuery.maxPrice={
           $lte: parseInt(queryParam.maxPrice)
        }
    }
    return constructQuery
}
export {SearchPage};
