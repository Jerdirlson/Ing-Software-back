import { Request, Response } from "express";
import { addScheduleService } from "../services/user.service";


/**
 * 
 * @param req 
 * @param res 
 */
export const addSchedule = async(req : Request, res : Response) =>{
    const fecha = req.body.fecha;
    const hora = req.body.hora;

    const scheduleData = {
        fecha: fecha,
        hora: hora
    };
    try {
        const response = await addScheduleService(scheduleData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response.schedule});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating schedule.'});
    }
};




