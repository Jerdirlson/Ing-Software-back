import { Router } from "express";
import { addSchedule } from "../controllers/schedule.controller";
const router : Router = Router();

router
    .post('/addSchedule', addSchedule)
    
    
export default router;