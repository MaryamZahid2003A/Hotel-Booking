import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;
        console.log('Checking for token in cookies...');
        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
            console.log('Token found:', token);

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Token decoded:', decoded);

            console.log('Attempting to find user with ID:', decoded.UserId);
            req.user = await User.findById(decoded.UserId).select('-password');
            console.log('User found:', req.user);

            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }

            next();
        } else {
            console.log('No token found in cookies');
            res.status(400).json({
                message: "Unauthorized User: Invalid Token"
            });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({
            message: "Unauthorized User: No Token"
        });
    }
});

export { protect };
