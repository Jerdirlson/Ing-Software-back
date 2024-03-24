import { Request, Response } from "express";
import { UserUpdate, User } from '../interfaces/User';
import connection from "../providers/database";
import { Adress } from "../interfaces/Adress";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Roles } from "interfaces/Roles";
import { RolModule } from "interfaces/RolModule";
import { Module } from "interfaces/Module";
import { phoneUser } from "interfaces/phoneUser";
import {Medic} from "interfaces/Medic";
import {Services} from "interfaces/Services";
import { Site } from "interfaces/Site";
import { MedicSite } from "interfaces/MedicSite";
import { Schedule } from "interfaces/Schedule";
import { MedicSchedule } from "interfaces/MedicSchedule";
import { Appointment } from "interfaces/Appointment";

/**
 * Metodo para la creacion de usuarios 
 * @param user 
 * @param address 
 * @returns 
 */

export async function createUser(user: User, address : Adress , phone: phoneUser) {
    try {
        //Insertando primero la dirección por las llaves foraneas
        const addressQuery = 'INSERT INTO Adress SET ?';
        const [addressResult] = await connection.query(addressQuery, address);
        const addressId = (addressResult as any).insertId;

        const hashedPassword = await encryptPassword(user.pwdUser);

        //Mockeando 
        const userData = {
            nameUser: user.nameUser,
            lastNameUser: user.lastNameUser,
            adressUser: addressId,
            emailUser: user.emailUser,
            pwdUser: hashedPassword,
            idRol: user.idRol,
            statusUser: user.statusUser
        };
        console.log("Inserted id Adress ", addressId);
        const query = 'INSERT INTO User SET ?';
        const result : any = await connection.query(query, userData);
        const userId = (result as any).id;
        const token = jwt.sign({_id : result[0].insertId}, process.env.TOKEN_SECRET || '')
        if(!result){
            return { success: false, message: 'User created successfully.', token: token, userCreate : userData };
        }
        console.log('User created successfully.', result);

        //Inserting phone to the correspondig user

        const phoneUserData={
            idUser : userId,
            telf: phone.telf,
            fijo: phone.fijo
        }
        const phoneUser : any = addPhoneUser(phoneUserData);
        if(!phoneUser){
            console.log("Error in the creation of phone User");
        }
        
        return { success: true, message: 'User created successfully.', token: token, userCreate : userData };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user.' };
    }
};


/**
 * Metodo para actualizar la informacion del usuario
 * @param user 
 * @param userId 
 * @returns 
 */
export async function updateUser(user: UserUpdate , userId : number){
    try {
        const updatedUserData: UserUpdate = {
            nameUser: user.nameUser,
            lastNameUser: user.lastNameUser,
            adressUser: user.adressUser,
            emailUser: user.emailUser,
            pwdUser: user.pwdUser,
            idRol: user.idRol,
            statusUser: user.statusUser
        };
        const query = "UPDATE users SET ? WHERE id = ?";
        const result = await connection.query(query, [updatedUserData, userId]);
        console.log("User updated successfully.", result);
        return { success: true, message: 'User update successfully.' };
    } catch (error) {
        console.error("Error updating user: ", error);
        return { success: false, message: 'Error updating user.' };
    }
};

/**
 * Function para encryption de la contraseña 
 * @param password 
 * @returns 
 */
export async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Comparación de la contraseña que da el user 
 * vs la contraseña guardada en la base de datos
 * @param password 
 * @param hashedPassword 
 * @returns 
 */
export async function validatePassword(password: string, hashedPassword : string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
}

/**
 * Metodo selct para obtener el usuario por email
 * @param email 
 * @returns 
 */
export async function getUserByEmail(email : string): Promise<User | null>{
    try {
        const query = 'SELECT * FROM User WHERE emailUser = ?';
        const [rows] : any = await connection.query(query, [email]);        
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
/**
 * Metodo select para obtener el usuario por el idUser
 * @param id
 * @returns 
 */

export async function getUserById(id : number): Promise<User | null>{
    try {
        const query = 'SELECT * FROM User WHERE idUser = ?';
        const [rows] : any = await connection.query(query, [id]);        
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}

/**
 * Metodo select para obtener de la tabla role (el rol el cual el usuario tiene)
 * @param idRole 
 * @returns 
 */

export async function getUserPermitions(idRole : number): Promise<Roles | null>{
    try {      
        const query = 'SELECT * FROM Role WHERE idRole = ?';
        const [roleRows] : any = await connection.query(query, [idRole] );
        if(roleRows.length > 0){
            return roleRows[0] as Roles;
        }else{
            return null;
        }
    } catch (error) {
        console.error("Error retrieving role user:", error);
        throw error;
    }
}

/**
 * Metodo select para obtener de la tabla RolModule el id del modulo, 
 *  mediante el idRol 
 * @param idRole 
 * @returns 
 */

export async function getUserRolModule(idRole : number): Promise<RolModule[] | null>{
    try {      
        const query = 'SELECT * FROM RolModule WHERE idRole = ?';
        const [roleRows] : any = await connection.query(query, [idRole] );
        if(roleRows.length > 0){
            return roleRows as RolModule[];
        }else{
            return null;
        }
    } catch (error) {
        console.error("Error retrieving rolModule user:", error);
        throw error;
    }
}

/**
 * Metodo select para obtener de la tabla module
 * @param RolModule 
 * @returns 
 */

export async function getUserLinks(RolModule : RolModule[]): Promise<Module[] | null>{
    try {
        const arryRolModule: Module[] = [];
        for (let index = 0; index < RolModule.length; index++) {
            const query = 'SELECT * FROM Module WHERE id = ?';
            const [roleRows]: any = await connection.query(query, [RolModule[index].idModule]);
            if (roleRows.length > 0) {
                arryRolModule.push(roleRows[0] as Module); 
            }
        }
        return arryRolModule;
    } catch (error) {
        console.error("Error retrieving Module user:", error);
        throw error;
    }        
}

/**
 * Hay que creare el objeto afuera (mas facil)
 * @param phone Metodo para añadir  phone de los usuarios
 * @returns 
 */
export async function addPhoneUser(phone : phoneUser){
    try {
        const query = 'INSERT INTO phoneUser SET idUser=?, telf=?, fijo=?';
        const res : any = await connection.query(query, [phone.idUser, phone.telf, phone.fijo]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'User phone created problem.', token: token, phneUser :  phone};
        }
        return { success: true, message: 'User phone created successfully.', token: token, phneUser :  phone};
    } catch (error) {
        console.error("Creating phone user:", error);
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
 * Crear objeto site afuera
 * @param site Metodo para crear sitios
 * @returns 
 */
export async function addSite(site : Site){
    try {
        const query = 'INSERT INTO Site SET nameSite=? ';
        const res : any = await connection.query(query, site.nameSite);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'Site created problem.', token: token, site :  site};
        }
        return { success: true, message: 'Site created successfully.', token: token, site :  site};
    } catch (error) {
        console.error("Creating Site:", error);
        throw error;
    }        
}

/**
 * Crear Objeto afuera
 * @param medicSite Metodo para añador MedicSte
 * @returns 
 */
export async function addMedicSite(medicSite : MedicSite){
    try {
        const query = 'INSERT INTO MedicSite SET idMedic=?, idSite=? ';
        const res : any = await connection.query(query, [medicSite.idMedic, medicSite.idSite]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'MedicSite created problem.', token: token, meidicSit :  medicSite};
        }
        return { success: true, message: 'MedicSite created successfully.', token: token, medicSite :  medicSite};
    } catch (error) {
        console.error("Creating MedicSite:", error);
        throw error;
    }        
}

export async function addSchedule(schedule : Schedule){
    try {
        const query = 'INSERT INTO Schedule SET fecha=?, hora=?';
        const res : any = await connection.query(query, [schedule.fecha,schedule.hora]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'schedule created problem.', token: token, schedule :  schedule};
        }
        return { success: true, message: 'schedule created successfully.', token: token, schedule :  schedule};
    } catch (error) {
        console.error("Creating schedule:", error);
        throw error;
    }        
}

/**
 * Crear objeto afuera
 * @param medicSchedule Metodo add para schedule del metodo
 * @returns 
 */
export async function MedicSchedule(medicSchedule : MedicSchedule){
    try {
        const query = 'INSERT INTO MedicSchedule SET idMedic=?, idSchedule=?, statusMedicSchedule=?, idSite=?';
        const res : any = await connection.query(query, [medicSchedule.idMedic, medicSchedule.idSchedule, medicSchedule.statusMedicSchedule, medicSchedule.idSite]);
        const token = jwt.sign({_id : res[0].idUser}, process.env.TOKEN_SECRET || '')
        if(!res){
            return { success: false, message: 'medicSchedule created problem.', token: token, meidicSit :  medicSchedule};
        }
        return { success: true, message: 'medicSchedule created successfully.', token: token, medicSite :  medicSchedule};
    } catch (error) {
        console.error("Creating medicSchedule:", error);
        throw error;
    }        
}
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




