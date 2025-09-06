import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";
export class BadRequest extends Error {
    public status : number
    constructor(public message :string){
        super(message)
        this.status = 400
    }
}

export class NotFound extends Error {
    public status : number
    constructor(public message : string){
        super(message)
        this.status = 404
    }
}

export class Unauthorized extends Error {
    public status : number 
    constructor (public message : string){
        super(message)
        this.status = 401
    }
}

export const error_handler = (
    err : object,
    req : Request ,
    res : Response ,
    next : NextFunction
)=>{
   
    let status = 500
    let message : string = `Internal Server Error ${(err as Error).message}`
    
    if (
    err instanceof NotFound ||
    err instanceof Unauthorized ||
    err instanceof BadRequest
    
  ){
    status = err.status,
    message = err.message
  }

  else if (
    err instanceof multer.MulterError
  ){
    if (err.code === 'LIMIT_FILE_SIZE') {
        status = 413 ,
        message = "File too Large"
    }
    else {
         status = 400,
        message = "Bad File Format"
    }
  }
   
   res.status(status).json({
    statusCode : status,
    message : message
  })
}
