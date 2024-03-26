import { Router } from "express";
import { addMedicControler, addMedicScheduleControler } from "../controllers/medic.controller";
const router : Router = Router();

router
    .post('/addMedicControler', addMedicControler)
    .post('/addMedicScheduleControler', addMedicScheduleControler);

export default router;