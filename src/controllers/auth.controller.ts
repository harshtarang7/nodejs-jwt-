import { Request,Response } from "express";
import User from '../models/user.model';
import { generateToken } from "../utils/jwt.utils";

export const signup = async (req:Request,res:Response):Promise<void>=>{
    try {
        const {username,email,password} = req.body;
        const userExist = await User.findOne({
            $or:[{email},{username}]
        });
        if(userExist){
            res.status(400).json({
                message:'User already exist'
            });
            return;
        }
        const user = await User.create({username,email,password});
        const token = generateToken(user);

        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            token,
        });
    } catch (error) {
        const typeError = error as Error;
        res.status(500).json({
            message:'Internal error occured',
            error:typeError.message
        });
    }
};