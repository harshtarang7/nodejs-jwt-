import { Request,Response } from "express";
import User, { IUser } from '../models/user.model';
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
        // const token = generateToken(user);

        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            // token,
        });
    } catch (error) {
        const typeError = error as Error;
        res.status(500).json({
            message:'Internal error occured',
            error:typeError.message
        });
    }
};

export const login = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {email,password} = req.body;
      const user = await User.findOne({email});

        if(user && (await user.comparePassword(password))){
            const token = generateToken(user)
            res.json({
                _id:user._id,
                username:user.username,
                email:email,
                token,
             });
        }
        else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        const ErrorType = error as Error;
        res.status(500).json({message:'server Error',error:ErrorType})
    }
}