import mongoose from "mongoose";

const db = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect("mongodb://mongo:27017/BookingAuth", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default db;
