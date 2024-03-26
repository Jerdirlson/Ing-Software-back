import { Request, Response } from "express";
import { addService } from "../services/services.service";

/**
 * 
 * @param req 
 * @param res 
 */
export const addServicesControler = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const serviceData = {
        nameService: nameService
    };
    try {
        const response = await addService(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response.service});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};