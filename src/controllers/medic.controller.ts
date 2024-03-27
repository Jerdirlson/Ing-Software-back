import { Request, Response } from "express";
import { addMedic, addMedicSchedule  } from "../services/medic.services";




/**
 * 
 * @param req 
 * @param res 
 */
export const addMedicControler = async(req : Request, res : Response) =>{
    const idUser = req.body.idUser;
    const idService = req.body.idService;
    const medicData = {
        idUser: idUser,
        idService: idService
    };
    try {
        const response = await addMedic(medicData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', schedule : response.medicU});
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
export const addMedicScheduleControler = async(req : Request, res : Response) =>{
    const idMedic = req.body.idMedic;
    const idSchedule = req.body.idSchedule;
    const idstatusMedicSchedule = req.body.statusMedicSchedule;
    const idSite = req.body.idSite;

    const medicScheduleData = {
        idMedic: idMedic,
        idSchedule: idSchedule,
        statusMedicSchedule: idstatusMedicSchedule,
        idSite:  idSite
    };
    try {
        const response = await addMedicSchedule(medicScheduleData);
        console.log("Response de addSchedule", response);
        res.status(200).json({ success: true, message: 'MedicSchedule updated successfully.', schedule : response.meidicSchedule});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error creating Medicschedule.'});
    }
};





