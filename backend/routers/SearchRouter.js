import express from "express";
import { SearchPage } from "../controller/SearchController";
const router=express.Router();

router.get('/Searches',SearchPage);

export default router;