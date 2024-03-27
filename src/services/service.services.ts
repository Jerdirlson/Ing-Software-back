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
 * 
 * @param idService Metodo select get by idService
 * @returns 
 */
export async function getService(idService : number):Promise<Services | null>{
    try {
        const query = 'SELECT nameService FROM  Services WHERE id=?';
        const [res] : any = await connection.query(query, idService);
        if(res.length > 0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("Select service by id", error);
        throw error;
    }        
}

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function addService(service : Services){
    try {
        const query = 'INSERT INTO Services SET nameService=?';
        const res : any = await connection.query(query, service.nameService);
        const token = jwt.sign({_id : res[0].nameService}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'Service created problem.', token: token, service :  service};
        }
        return { success: true, message: 'Service created succesfully.', token: token, service :  service};
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}
