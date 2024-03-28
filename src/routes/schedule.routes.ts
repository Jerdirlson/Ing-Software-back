import { Router } from "express";
import { addSchedule, getScheduleById , getScheduleByFecha} from "../controllers/schedule.controller";
const router : Router = Router();

router
    .post('/addSchedule', addSchedule)
    .get('/getScheduleById', getScheduleById)
    .get('/getScheduleByFecha', getScheduleByFecha);
    
    
export default router;