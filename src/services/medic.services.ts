import { Request, Response } from "express";
import { UserUpdate, User } from '../interfaces/User';
import connection from "../providers/database";
import { Adress } from "../interfaces/Adress";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Roles } from "interfaces/Roles";
import { RolModule } from "interfaces/RolModule";
import { Module } from "interfaces/Module";
import { PhoneUser } from "interfaces/phoneUser";
import {Medic} from "interfaces/Medic";
import {Services} from "interfaces/Services";
import { Site } from "interfaces/Site";
import { Schedule } from "interfaces/Schedule";
import { MedicSchedule } from "interfaces/MedicSchedule";
import { Appointment } from "interfaces/Appointment";


/**
 * Crear objeto afuera
 * @param medic Metodo para añadir medicos 
 * @returns 
 */
export async function addMedic(medic : Medic){
    try {
        const query = 'INSERT INTO Medic SET idUser=?, idService=? ';
        const res : any = await connection.query(query, [medic.idUser, medic.idService]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'User phone created problem.', token: token, medicU :  medic};
        }
        return { success: true, message: 'Medic created successfully.', token: token, medicU :  medic};
    } catch (error) {
        console.error("Creating medic:", error);
        throw error;
    }        
}



/**
 * Crear objeto afuera
 * @param medicSchedule Metodo add para schedule del metodo
 * @returns 
 */
export async function addMedicSchedule(medicSchedule : MedicSchedule){
    try {
        const query = 'INSERT INTO MedicSchedule SET idMedic=?, idSchedule=?, statusMedicSchedule=?, idSite=?';
        const res : any = await connection.query(query, [medicSchedule.idMedic, medicSchedule.idSchedule, medicSchedule.statusMedicSchedule, medicSchedule.idSite]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'medicSchedule created problem.', token: token, meidicSchedule:  medicSchedule};
        }
        return { success: true, message: 'medicSchedule created successfully.', token: token, meidicSchedule :  medicSchedule};
    } catch (error) {
        console.error("Creating medicSchedule:", error);
        throw error;
    }        
}


/**
 * 
 * @param idMedicSchedule Metodo select por id MedicSchedule
 * @returns 
 */
export async function getMedicSchedule(idMedicSchedule : number): Promise<MedicSchedule | null>{
    try {
        const query = 'SELECT idMedic, idSchedule, statusMedicSchedule, idSite MedicSchedule WHERE id=?';
        const [res] : any = await connection.query(query, idMedicSchedule);
        if(res.length > 0){
            return res;
        }
        return res
    } catch (error) {
        console.error("select medicSchedule:", error);
        throw error;
    }        
}

/**
 * 
 * @param idMedic Metodo select por id Medic
 * @returns 
 */
export async function getMedicScheduleByidMedic(idMedic : number): Promise<MedicSchedule | null>{
    try {
        const query = 'SELECT id, idSchedule, statusMedicSchedule, idSite MedicSchedule WHERE idMedic=?';
        const [res] : any = await connection.query(query, idMedic);
        if(res.length > 0){
            return res;
        }
        return res
    } catch (error) {
        console.error("Select by idMedic medicSchedule:", error);
        throw error;
    }        
}

/**
 * 
 * @param idSite Metodo select por idSite
 * @returns 
 */
export async function getMedicScheduleByidSite(idSite : number): Promise<MedicSchedule | null>{
    try {
        const query = 'SELECT id,idMedic ,idSchedule, statusMedicSchedule  MedicSchedule WHERE idSite=?';
        const [res] : any = await connection.query(query, idSite);
        if(res.length > 0){
            return res;
        }
        return res
    } catch (error) {
        console.error("Select by idSite medicSchedule:", error);
        throw error;
    }        
}

/**
 * 
 * @param idSite Metodo select por status
 * @returns 
 */
export async function getMedicScheduleStatus(status : boolean): Promise<MedicSchedule | null>{
    try {
        const query = 'SELECT id,idMedic ,idSchedule, idSite  MedicSchedule WHERE statusMedicSchedule=?';
        const [res] : any = await connection.query(query, status);
        if(res.length > 0){
            return res;
        }
        return res
    } catch (error) {
        console.error("Select by status medicSchedule:", error);
        throw error;
    }        
}


/**
 * 
 * @param idUser Metodo select by idUSer 
 * @returns 
 */
export async function getMedicByidUser(idUser : number): Promise<Medic | null>{
    try {
        const query = 'SELECT idService FROM Medic WHERE idUser=? ';
        const [res] : any = await connection.query(query, idUser);
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("SelectMedic by id User:", error);
        throw error;
    }        
}

/**
 * 
 * @param idService Metodo select by idService 
 * @returns 
 */
export async function getMedicByidService(idService : number): Promise<Medic | null>{
    try {
        const query = 'SELECT idUser FROM Medic WHERE idService=? ';
        const [res] : any = await connection.query(query, idService);
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("Setect medic by idService:", error);
        throw error;
    }        
}

/**
 * 
 * @param idMedic Metodo setect by id del medic
 * @returns 
 */
export async function getMedicByidMedic(idMedic : number): Promise<Medic | null>{
    try {
        const query = 'SELECT idUser, idService FROM Medic WHERE id=? ';
        const [res] : any = await connection.query(query, idMedic);
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("Select medic  by id:", error);
        throw error;
    }        
}