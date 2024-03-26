import { Request, Response } from "express";
import { addAppointment } from "../services/user.service";


/**
 * 
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