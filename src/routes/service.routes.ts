import { Router } from "express";
import { addServicesControler } from "../controllers/service.controller";
const router : Router = Router();

router
    .post('/addMedicControler', addServicesControler)
    .post('/addServicesControlerDescip',addServicesControlerDescip )
    .p
    
    
export default router;