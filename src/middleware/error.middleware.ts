import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/erro.utils";

export const errorHandler =(error:Error,req:Request,res:Response,next:NextFunction)=>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status:'error',
            message:error.message,
            statusCode:error.statusCode
        });
    }

    console.log(error);

    res.status(500).json({
        staus:'error',
        message:'something went wrong'
    });
};

export const notFound = (req:Request, res:Response, next:NextFunction)=>{
    const error = new AppError('Not found',404)
    next(error);
};