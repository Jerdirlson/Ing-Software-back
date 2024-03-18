import { Request, Response } from "express";
import { UserUpdate, User } from '../interfaces/User';
import connection from "../providers/database";
import { Adress } from "../interfaces/Adress";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Roles } from "interfaces/Roles";

export async function createUser(user: User, address : Adress) {
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
            status: user.status
        };
        console.log("Inserted id Adress ", addressId);
        const query = 'INSERT INTO User SET ?';
        const result : any = await connection.query(query, userData);
        console.log('User created successfully.', result);
        const token = jwt.sign({_id : result[0].insertId}, process.env.TOKEN_SECRET || '')
        return { success: true, message: 'User created successfully.', token: token, userCreate : userData };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user.' };
    }
};


export async function updateUser(user: UserUpdate , userId : number){
    try {
        const updatedUserData: UserUpdate = {
            nameUser: user.nameUser,
            lastNameUser: user.lastNameUser,
            adressUser: user.adressUser,
            emailUser: user.emailUser,
            pwdUser: user.pwdUser,
            idRol: user.idRol,
            status: user.status
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

export async function getUserPermitions(idRole : number): Promise<Roles | null>{
    try {      
        const query = 'SELECT * FROM Role WHERE idRole = ?';
        const [roleRows] : any = await connection.query(query, [idRole] );
        if(roleRows > 0){
            return roleRows[0] as Roles;
        }else{
            return null;
        }
    } catch (error) {
        console.error("Error retrieving role user:", error);
        throw error;
    }
}