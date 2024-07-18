import expressAsyncHandler from "express-async-handler";
import generateToken from "../utilis/generateToken.js";
import User from "../models/UserModel.js";

// Login
const Login = expressAsyncHandler(async (req, res) => {
   
});

// Register
const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({message :' User Already Exist !'})
        }
        const user = await User.create({ name, email, password });
        if (user) {
            generateToken(res,user._id)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(400).json({message : ' Invalid Data'})
        }
    } catch (error) {
      
        res.status(400).json({ message: error.message });
    }
});

// Logout
const logout = expressAsyncHandler(async (req, res) => {
  
    res.status(200).json({ message: "Successfully Logged Out!" });
});




export {
    register,
    Login,
    logout
}
