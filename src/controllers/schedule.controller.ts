import { Request, Response } from "express";
import { addScheduleService, getSchedule, getScheduleByDate } from "../services/schedule.services";


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


/**
 * get de el horario por el id
 * @param req 
 * @param res 
 */
export const getScheduleById = async(req : Request, res : Response) =>{
    const id = req.body.id;
    try {
        const response = await getSchedule(id);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating schedule.'});
    }
};

/**
 * get horario por dia
 * @param req 
 * @param res 
 */
export const getScheduleByFecha = async(req : Request, res : Response) =>{
    const fecha = req.body.fecha;
    try {
        const response = await getScheduleByDate(fecha);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating schedule.'});
    }
};



