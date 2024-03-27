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
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function addServiceWithDescrip(service : Services){
    try {
        const query = 'INSERT INTO Services SET nameService=? descriptionService=?';
        const res : any = await connection.query(query, [service.nameService, service.descriptionService]);
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

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function getServiceWithDescrip(): Promise<Services[] | null>{
    try {
        const query = 'SELECT * FROM Services';
        const [res] : any = await connection.query(query);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function getServiceWithDescripById(service : Services): Promise<Services | null>{
    try {
        const query = 'SELECT * FROM Services where id =?';
        const [res] : any = await connection.query(query, service.id);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function getServiceWithDescripByName(service : Services): Promise<Services | null>{
    try {
        const query = 'SELECT * FROM Services where nameService=?';
        const [res] : any = await connection.query(query, service.nameService);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}


/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function updateServiceById(service : Services): Promise<Services[] | null>{
    try {
        const query = 'Update Services set nameService=? where id =?';
        const [res] : any = await connection.query(query ,[service.nameService,service.id]);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function updateServiceDescriptionByName(service : Services): Promise<Services[] | null>{
    try {
        const query = 'Update Services set descriptionService=? where nameService=?';
        const [res] : any = await connection.query(query ,[service.descriptionService,service.nameService]);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}

/**
 * Crear objeto Services afuera
 * @param service Metodo para crear servicios a medicos
 * @returns 
 */
export async function deleteServiceDescriptionByName(service : Services): Promise<Services[] | null>{
    try {
        const query = 'Delete Services  where nameService=?';
        const [res] : any = await connection.query(query ,service.nameService);
        if(!res){
            return res
        }
        return res
    } catch (error) {
        console.error("Creating service:", error);
        throw error;
    }        
}
