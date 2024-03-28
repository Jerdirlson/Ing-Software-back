import { Router } from "express";
import { addServicesControler, addServicesControlerDescip, deltServiceByName, getServiceAll, getServiceByName, getServiceId, updServicesById, updServicesDesc } from "../controllers/service.controller";
const router : Router = Router();

router
    .post('/addMedicControler', addServicesControler)
    .post('/addServicesControlerDescip',addServicesControlerDescip )
    .put('/updServicesById', updServicesById)
    .put('/updServicesDesc', updServicesDesc)
    .delete('/deltServiceByName', deltServiceByName)
    .get('/getServiceId', getServiceId)
    .get('/getServiceByName', getServiceByName)
    .get('/getServiceAll',getServiceAll)

    
    
export default router;