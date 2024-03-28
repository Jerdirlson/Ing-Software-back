import { Request, Response } from "express";
import { addAppointment, getAppointmentByidScheduleMedic, getAppointmentByidSite, getAppointmentByidUser, getAppointmentbyId } from "../services/appointments.services";


/**
 * add appoinment
 * @param req 
 * @param res 
 */
export const addAppointemtControler = async(req : Request, res : Response) =>{
    const idUser = req.body.idUser;
    const idScheduleMedic = req.body.idScheduleMedic;
    const statusAppointment = req.body.statusAppointment;
    const idSite = req.body.idSite;
    const appointmentData = {
        idUser: idUser,
        idScheduleMedic: idScheduleMedic,
        statusAppointment :statusAppointment,
        idSite : idSite
    };
    try {
        const response = await addAppointment(appointmentData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating schedule.'});
    }
};

/**
 * get appointment by id 
 * @param req 
 * @param res 
 */
export const getAppointemtControlerId = async(req : Request, res : Response) =>{
   const id = req.body.id;

    try {
        const response = await getAppointmentbyId(id);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating schedule.'});
    }
};

/**
 * get appointment by id User
 * @param req 
 * @param res 
 */
export const getAppointemtControlerIdUser = async(req : Request, res : Response) =>{
    const idUser = req.body.idUser;
 
     try {
         const response = await getAppointmentByidUser(idUser);
         console.log("Response de addSchedule", response);
         res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
     } catch (error) {
         console.error("Error updating user: ", error);
         res.status(500).json({ success: false, message: 'Error creating schedule.'});
     }
 };

 /**
 * get by idScheduleMedic
 * @param req 
 * @param res 
 */
export const getAppointemtControlerIdScheduleMedic = async(req : Request, res : Response) =>{
    const idScheduleMedic = req.body.idScheduleMedic;
 
     try {
         const response = await getAppointmentByidScheduleMedic(idScheduleMedic);
         console.log("Response de addSchedule", response);
         res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
     } catch (error) {
         console.error("Error updating user: ", error);
         res.status(500).json({ success: false, message: 'Error creating schedule.'});
     }
 };

 /**
 * get appointment by status
 * @param req 
 * @param res 
 */
export const getAppointemtControlerByStatus = async(req : Request, res : Response) =>{
    const statusAppointment = req.body.statusAppointment;
 
     try {
         const response = await getAppointmentbyId(statusAppointment);
         console.log("Response de addSchedule", response);
         res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
     } catch (error) {
         console.error("Error updating user: ", error);
         res.status(500).json({ success: false, message: 'Error creating schedule.'});
     }
 };

 /**
 * 
 * @param req 
 * @param res 
 */
export const getAppointemtControlerIdSite = async(req : Request, res : Response) =>{
    const idSite = req.body.idSite;
 
     try {
         const response = await getAppointmentByidSite(idSite);
         console.log("Response de addSchedule", response);
         res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
     } catch (error) {
         console.error("Error updating user: ", error);
         res.status(500).json({ success: false, message: 'Error creating schedule.'});
     }
 };