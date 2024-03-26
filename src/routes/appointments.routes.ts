import { Router } from "express";
import { addAppointemtControler  } from "../controllers/appointments.controller";
const router : Router = Router();

router
    .post('/appointment', addAppointemtControler);


export default router;