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
 * @param appointment Metodo add para appointment
 * @returns 
 */
export async function addAppointment(appointment : Appointment){
    try {
        const query = 'INSERT INTO Appointment SET idUser=?, idScheduleMedic=?,statusAppointment=?, idSite=? ';
        const res : any = await connection.query(query, [appointment.idUser,appointment.idScheduleMedic,appointment.statusAppointment,appointment.idSite]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'appointment created problem.', token: token, appointment :  appointment};
        }
        return { success: true, message: 'appointment created successfully.', token: token, appointment :  appointment};
    } catch (error) {
        console.error("Creating appointment:", error);
        throw error;
    }        
}

/**
 * 
 * @param idAppo Metodo select appointment by id
 * @returns 
 */
export async function getAppointmentbyId(idAppo : number): Promise<Appointment | null >{
    try {
        const query = 'SELECT idUser, idScheduleMedic,statusAppointment, idSite FROM Appointment id=? ';
        const [res] : any = await connection.query(query, idAppo);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Select id appointment:", error);
        throw error;
    }        
}

/**
 * 
 * @param idUser Metodo select appointment by idUser
 * @returns 
 */
export async function getAppointmentByidUser(idUser : number): Promise<Appointment | null >{
    try {
        const query = 'SELECT id, idScheduleMedic,statusAppointment, idSite FROM Appointment idUser=? ';
        const [res] : any = await connection.query(query, idUser);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Select idUser appointment:", error);
        throw error;
    }        
}
/**
 * 
 * @param idScheduleMedic Metodo select appointment by idScheduleMedic
 * @returns 
 */
export async function getAppointmentByidScheduleMedic(idScheduleMedic : number): Promise<Appointment | null >{
    try {
        const query = 'SELECT id, idUser,statusAppointment, idSite FROM Appointment idScheduleMedic=? ';
        const [res] : any = await connection.query(query, idScheduleMedic);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Select idScheduleMedic appointment:", error);
        throw error;
    }        
}

/**
 * 
 * @param status Metodo select appointment by status
 * @returns 
 */
export async function getAppointmentByStatus(status : boolean): Promise<Appointment | null >{
    try {
        const query = 'SELECT id, idUser, idScheduleMedic, idSite FROM Appointment statusAppointment=? ';
        const [res] : any = await connection.query(query, status);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Select status appointment:", error);
        throw error;
    }        
}

/**
 * 
 * @param idSite Metodo select appointment by idSite
 * @returns 
 */
export async function getAppointmentByidSite(idSite : number): Promise<Appointment | null >{
    try {
        const query = 'SELECT id, idUser, idScheduleMedic, statusAppointment FROM Appointment idSite=? ';
        const [res] : any = await connection.query(query, idSite);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Select idSite appointment:", error);
        throw error;
    }        
}


/**
 * 
 * @param idSite Metodo select appointment by idSite
 * @returns 
 */
export async function updateAppointment(appoinment : Appointment): Promise<Appointment | null >{
    try {
        const query = 'Update Appointment Set idScheduleMedic =? where id=0 AND idUser=? ';
        const [res] : any = await connection.query(query, [appoinment.idScheduleMedic, appoinment.idUser]);
        if(res.length > 0){
            return res
        }
        return res;
    } catch (error) {
        console.error("Update idSite appointment:", error);
        throw error;
    }        
}