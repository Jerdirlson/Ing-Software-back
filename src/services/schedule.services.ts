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


export async function addScheduleService(schedule : Schedule){
    try {
        const query = 'INSERT INTO Schedule SET fecha=?, hora=?';
        const res : any = await connection.query(query, [schedule.fecha,schedule.hora]);
        if(!res){
            return { success: false, message: 'schedule created problem.', schedule :  schedule};
        }
        return { success: true, message: 'schedule created successfully.', schedule :  schedule};
    } catch (error) {
        console.error("Creating schedule:", error);
        throw error;
    }        
}

/**
 * 
 * @param idSchedule Select Schedule by id
 * @returns 
 */
export async function getSchedule(idSchedule : number): Promise<Schedule | null>{
    try {
        const query = 'SELECT fecha, hora FROM Schedule WHERE id=?';
        const [res] : any = await connection.query(query, idSchedule);
        
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("Creating schedule:", error);
        throw error;
    }        
}

/**
 * 
 * @param idSchedule Select Schedule by fecha
 * @returns 
 */
export async function getScheduleByDate(fecha : Date): Promise<Schedule[] | null>{
    try {
        const query = 'SELECT id, hora FROM Schedule WHERE fecha=?';
        const [res] : any = await connection.query(query, fecha);
        
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("Date select schedule:", error);
        throw error;
    }        
}