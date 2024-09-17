export class AppError extends Error{
    statusCode:number;
    isOperational:boolean;

    constructor(message:string,statusCode:number){
        super(message),
        this.statusCode= statusCode;
        this.isOperational=true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError{
    constructor(message:string){
        super(message,400)
    }
}

export class UnauthorizedError extends AppError{
    constructor(message:string){
        super(message,401)
    }
}

export class NotFoundError extends AppError{
    constructor(message:string){
        super(message,404)
    }
}

export const catchAsync = (fn:Function)=>{
    return (req:any, res:any, next:any)=>{
        Promise.resolve(fn(req,res,next)).catch(next)
    };
};