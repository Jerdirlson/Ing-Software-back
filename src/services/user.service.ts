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
 * Metodo para la creacion de usuarios 
 * @param user 
 * @param address 
 * @returns 
 */

export async function createUser(user: User, address : Adress , phone: PhoneUser) {
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
 * Metodo select para obtener el usuario por el nuem
 * @param id
 * @returns 
 */

export async function getUserByNumId(id : number): Promise<User | null>{
    try {
        const query = 'SELECT * FROM User WHERE numId = ?';
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
export async function addPhoneUser(phone : PhoneUser){
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
 * 
 * @param idUser Metodo select de phone user by id user
 * @returns 
 */
export async function getPhoneUser(idUser : number): Promise<PhoneUser[] | null> {
    try {
        const query = 'SELECT id, telf, fijo FROM phoneUser WHERE idUser=?';
        const [res] : any = await connection.query(query,idUser );
        if(res.length >0){
            return res;
        }
        return res;
    } catch (error) {
        console.error("setect phone user by idUser:", error);
        throw error;
    }        
}


/**
 * 
 * @param idsite Metodo select para sites by id
 * @returns 
 */
export async function getSite(idsite : number):Promise<Site | null>{
    try {
        const query = 'SELECT nameSite FROM Site WHERE id=? ';
        const res : any = await connection.query(query, idsite);
        if(res.length > 0){
           return res;
        }
        return res;
    } catch (error) {
        console.error("select site Site by id:", error);
        throw error;
    }        
}

/**
 * 
 * @param sitnameSite Metodo select para sites by name
 * @returns 
 */
export async function getSiteByName(sitnameSite : string):Promise<Site | null>{
    try {
        const query = 'SELECT id FROM Site WHERE nameSite=? ';
        const res : any = await connection.query(query, sitnameSite);
        if(res.length > 0){
           return res;
        }
        return res;
    } catch (error) {
        console.error("select Site by name:", error);
        throw error;
    }        
}









