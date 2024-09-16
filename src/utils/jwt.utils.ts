import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user:IUser):string =>{
    return jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET as string,
        {expiresIn:'1d'}
    );
};

export const verifyToken = (token:string):jwt.JwtPayload | string =>{
    return jwt.verify(token, process.env.JWT_SECRET as string);
};