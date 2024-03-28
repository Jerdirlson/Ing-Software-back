import { Request, Response } from "express";
import { addService,deleteServiceDescriptionByName,updateServiceDescriptionByName,updateServiceById,getServiceWithDescripByName,getServiceWithDescripById, getServiceWithDescrip, addServiceWithDescrip } from "../services/services.service";

/**
 * add service byname
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

/**
 * add service with descrip
 * @param req 
 * @param res 
 */
export const addServicesControlerDescip = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const descriptionService = req.body.descriptionService;
    const serviceData = {
        nameService: nameService,
        descriptionService: descriptionService
    };
    try {
        const response = await addServiceWithDescrip(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response.service});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * update service with id
 * @param req 
 * @param res 
 */
export const updServicesById = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const id = req.body.id;
    const serviceData = {
        id :id,
        nameService: nameService
    };
    try {
        const response = await updateServiceById(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * add service with name
 * @param req 
 * @param res 
 */
export const updServicesDesc = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const descriptionService = req.body.descriptionService;
    const serviceData = {
        nameService: nameService,
        descriptionService: descriptionService
    };
    try {
        const response = await updateServiceDescriptionByName(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * delete service by name
 * @param req 
 * @param res 
 */
export const deltServiceByName = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const serviceData = {
        nameService: nameService
    };
    try {
        const response = await deleteServiceDescriptionByName(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * get service with id
 * @param req 
 * @param res 
 */
export const getServiceId = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const id = req.body.id;
    const serviceData = {
        id : id,
        nameService: nameService
    };
    try {
        const response = await getServiceWithDescripById(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * get service with name
 * @param req 
 * @param res 
 */
export const getService = async(req : Request, res : Response) =>{
    const nameService = req.body.nameService;
    const serviceData = {
        nameService: nameService
    };
    try {
        const response = await getServiceWithDescripByName(serviceData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};

/**
 * get service with descrip
 * @param req 
 * @param res 
 */
export const getServiceAll = async(req : Request, res : Response) =>{
    try {
        const response = await getServiceWithDescrip();
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Service updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Service.'});
    }
};