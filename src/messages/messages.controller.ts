import { message_service } from "./messages.service";
import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound , Unauthorized} from "../utils/errors";
import { settings_repository } from "../settings/repository";



class MessageController {
    createMessage = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        try{
            const userid = req.params.id
            if(!userid) throw new NotFound("URL Not Found")
            const user_settings = await settings_repository.get_settings_by_user_id(userid)
            if(user_settings.paused) throw new BadRequest("User Link is paused")
            const result = await message_service.create_message(req , userid)
            res.status(201).json({
                statusCode : 201,
                data : result
            })
        }
        catch(error){
            next(error)
        }
    }

    getMessagesByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const user = req.user
            if(!user) throw new Unauthorized("User not authenticated")
            const result = await message_service.get_messages_by_user(user.id)
            res.status(200).json({
                statusCode : 200,
                data : result
            })
        }
        catch(error){
            next(error)
        }
    }


    constructor(){
        this.createMessage = this.createMessage.bind(this)
        this.getMessagesByUser = this.getMessagesByUser.bind(this)
    }
}

export const message_controller = new MessageController()