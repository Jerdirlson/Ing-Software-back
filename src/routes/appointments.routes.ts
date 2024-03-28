import { Router } from "express";
import { addAppointemtControler, getAppointemtControlerByStatus, getAppointemtControlerId, getAppointemtControlerIdScheduleMedic, getAppointemtControlerIdSite, getAppointemtControlerIdUser  } from "../controllers/appointments.controller";
const router : Router = Router();

router
    .post('/appointment', addAppointemtControler)
    .get('/getAppointemId', getAppointemtControlerId)
    .get('/getAppointemtIdUser', getAppointemtControlerIdUser)
    .get('/getAppointemtIdScheduleMedic',getAppointemtControlerIdScheduleMedic)
    .get('/getAppointemtStatus', getAppointemtControlerByStatus)
    .get('/getAppointemtIdSite', getAppointemtControlerIdSite)
export default router;