import { Request, Response } from "express";
import { updateUser , createUser, getUserByEmail, validatePassword, getUserById, getUserRolModule, getUserLinks, addPhoneUser} from '../services/user.service';
import jwt from 'jsonwebtoken';
import { TokenValidator } from "../libs/validateToken";
import { User } from "interfaces/User";
import { RolModule } from "interfaces/RolModule";
import { Module } from "interfaces/Module";

export const signup = async (req: Request, res: Response) => {
    console.log();
    const user = req.body.user;
    const adress = req.body.address;
    const phone = req.body.phone;
    try {
        const response = await createUser(user, adress, phone);
        console.log("Response de singup", response);
        res.status(200).header('auth-token', response.token).json({ success: true, message: 'User updated successfully.', userCreate : response.userCreate});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error updating user.'});
    }
};

export const signin = async (req : Request, res : Response) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phoneUser;
    const response : any = await getUserByEmail(email);
    

    console.log(response);

    if(!response){
        res.status(404).json({success: false, message:'El usuario no existe.'});
    }

    const correctPassword : boolean = await validatePassword(password, response?.pwdUser|| '')

    if(!correctPassword){
        res.status(404).json({success: false, message:'La contraseña no es correcta.'});
    }
    
    const responseRol :any = await getUserRolModule(response.idRol);
    console.log(responseRol);

    if(!responseRol){
        res.status(404).json({success: false, message:'El rol no tiene un /link activo'});
    }
    
    const responseModule :any = await getUserLinks(responseRol);  
    console.log(responseModule); 
    
    if(!responseModule){
        res.status(404).json({success: false, message:'El modulo no tiene link'});
    }

    const token : string = jwt.sign({_id : response.idUser}, process.env.TOKEN_SECRET || ' ', {
        expiresIn: 60 * 60  //una hora
    })
    res.cookie("token", token)
    res.status(200).header('auth-token', token).json({response, responseModule });
};

export const profile = async (req : Request, res : Response) => {
    const user: User | null = await getUserById(req.userId);

    if (!user) return res.status(404).json('No se encontro al usuario.')
    
    const rol :RolModule[] | null = await getUserRolModule(user.idRol);
    if (!rol) return res.status(404).json('No se encontro el rol del usuario.')

    const module :Module[] | null = await getUserLinks(rol); 
    if (!module) return res.status(404).json('No se encontro el rol del usuario.')

    res.status(200).json({user, module})
};

