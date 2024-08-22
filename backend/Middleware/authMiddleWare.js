import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded.UserId).select('-password');
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
