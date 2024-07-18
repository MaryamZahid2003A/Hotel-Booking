import express from 'express'
import { Login,logout,register } from '../controller/UserController.js';


const router=express.Router();
router.post('/register',register);
router.post('/logout',logout)
router.post('/login',Login)
export default router;

