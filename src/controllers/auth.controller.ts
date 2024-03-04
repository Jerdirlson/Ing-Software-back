import { Request, Response } from "express";
import { updateUser , createUser, getUserByEmail, validatePassword, getUserById} from '../services/user.service';
import jwt from 'jsonwebtoken';
import { TokenValidator } from "../libs/validateToken";
import { User } from "interfaces/User";

export const signup = async (req: Request, res: Response) => {
    console.log();
    const user = req.body.user;
    const adress = req.body.address;
    try {
        const response = await createUser(user, adress);
        console.log("Response de singup", response);
        res.status(200).header('auth-token', response.token).json({ success: true, message: 'User updated successfully.', userCreate : response.userCreate});
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ success: false, message: 'Error updating user.'});
    }
};

export const singin = async (req : Request, res : Response) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const response : any = await getUserByEmail(email);

    console.log(response);

    if(!response)
        res.status(404).json('El usuario no existe.');

    const correctPassword : boolean = await validatePassword(password, response?.pwdUser|| '')

    if(!correctPassword)
        res.status(404).json('La contraseña no es correcta.');

    const token : string = jwt.sign({_id : response.idUser}, process.env.TOKEN_SECRET || ' ', {
        expiresIn: 60 * 60  //una hora
    })
    res.status(200).header('auth-token', token).json(response)
};

export const profile = async (req : Request, res : Response) => {
    const user: User | null = await getUserById(req.userId)

    if (!user) return res.status(404).json('No se encontro al usuario.')
    res.status(200).json(user)
};