import { Request , Response , NextFunction } from "express";
import { Unauthorized } from "../utils/errors";
import { settings_service } from "./settings.service";

class SettingsController {

    getSettings = async(req: Request , res : Response , next : NextFunction) => {
        try{
          const user = req.user
          if(!user) throw new Unauthorized('User not authenticated')
          const result = await settings_service.get_settings_by_user_id(user.id)
          res.status(200).json({
            statusCode : 200 ,
            data : result
          })
        }
        catch(error){
            next(error)
        }
   }

   updateSettings = async(req : Request , res : Response , next : NextFunction) => {
      try{
        const user = req.user
        if (!user) throw new Unauthorized("User not authenticated")
        const result = await settings_service.update_settings_by_user_id(user.id , req)
        res.status(200).json({
            statusCode : 200,
            data : result
        })
      }
      catch(error){
         next(error)
      }
   }
    constructor (){
        this.getSettings = this.getSettings.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
    }
}

export const settings_controller = new SettingsController()