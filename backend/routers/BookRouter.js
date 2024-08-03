import express from "express";

import { book } from "../controller/BookController.js";
const router=express.Router();

router.post('/book',book);
export default router;