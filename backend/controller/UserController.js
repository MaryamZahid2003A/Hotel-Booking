import expressAsyncHandler from "express-async-handler";
import generateToken from "../utilis/generateToken.js";
import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
// Login



// Login
const Login = expressAsyncHandler(async (req, res) => {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
            if (user && (await user.checkPassword(password))){
                generateToken(res,user._id);
                res.status(200).json({
                    message : "Sucessfully Login ",
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    password:user.password
                })
            }
            else{
                res.status(401).json({ message: "Invalid Email or Password" });
            }
    
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
            res.status(400).json({message : 'Invalid Data'})
        }
    } catch (error) {
      
        res.status(401).json({ message: error.message });
    }
});

// Logout
const logout = expressAsyncHandler(async (req, res) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({
    message: "Logout Sucessfully ! "
  })
});




export {
    register,
    Login,
    logout
}
