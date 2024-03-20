import { Request, Response } from "express";
import { User, UserUpdate } from "../interfaces/User";
import {Roles} from "../interfaces/Roles";
import { getUserById , getUserPermitions} from '../services/user.service';
import connection from "../providers/database";

/**
 * Prueba Para un endpoint pedir ayuda a yeye
 * @param req 
 * @param res 
 */
export const getRoles = async(req : Request, res : Response) =>{
    const prof : User | null = await getUserById(req.userId);
    if(prof){
        const response : Roles | null = await getUserPermitions(prof.idRol) ;
        console.log(response);

        if(!response)
            res.status(404).json('El usuario no existe.');
    }
    
}

    
