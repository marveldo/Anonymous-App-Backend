import { NextFunction, Request , Response} from "express";

import { user_Service } from "./user.service";
import { Unauthorized } from "../utils/errors"

export class UserController {
  
  createUser = async (req: Request, res: Response, next : NextFunction): Promise<void> => {
    try {
      
      const result = await user_Service.create(req);
      const response = user_Service.signIn(result)
      res.status(201).json({
        statusCode : 201,
        data : response
      });
    } catch (error) {
       next(error)
    }
  }

  updateUser = async (req: Request, res: Response, next : NextFunction): Promise<void> => {
    try{
      const user = req.user
      if(!user) throw new Unauthorized("User not authenticated")
      const result = await user_Service.update(user.id , req)
      res.status(200).json({
        statusCode : 200,
        data : result
      })
    }
    catch(error){
      next(error)
    }
  }

  deleteUser = async (req: Request, res: Response, next : NextFunction): Promise<void> => {
    try{
      const user = req.user
      if(!user) throw new Unauthorized("User not authenticated")
      await user_Service.delete(user.id)
      res.status(204).json()
    }
    catch(error){
      next(error)
    }
  }

  constructor() {
    this.createUser = this.createUser.bind(this);
  }
}


export const userController = new UserController();