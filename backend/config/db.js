import mongoose from "mongoose";

const db=async()=>{
    try{
        const databse = await mongoose.connect(process.env.MONGO_DB);
        console.log(`Connect to Mongo ${databse.connection.host}`)
    }
   catch(error){
    console.error ("Error Ocuured")
    process.exit(1);
   }
}

export default db;