import { MessageRepository } from "./repository";
import { Messages } from "../generated/prisma";
import { MessageDto } from "./dto";
import { Request } from "express";
import { saveFileToDisk } from "../utils/saver";
import { message_repository } from "./repository";
import { user_repository } from "../users/repository"
import { NotFound } from "../utils/errors";
import { S3Service } from "../utils/s3";

class MessageService {
     
    constructor(private repo : MessageRepository){}

    async create_message(request : Request, user_id : string) : Promise<Messages>{
         const body = request.body
         const user = await user_repository.get_by_id(user_id)
         if(!user) throw new NotFound("User not found")
         const value = MessageDto.validate(body)
         let file_url : string | null = null
         let value_message : string | null = null
         
         if(request.file){
            file_url = await S3Service.uploadFileToS3(request.file.buffer, request.file.originalname, 'recordings', request.file.mimetype)
         }
         if(value.message === undefined) value_message = null
         else value_message = value.message
        const data = { 
                recording : file_url,
                content : value_message,
                user_id : user_id
        }
        return await this.repo.create(data)
    }
    async get_messages_by_user(user_id : string) : Promise<Messages[]> {
        const user = await user_repository.get_by_id(user_id)
        if(!user) throw new NotFound("User not found")
        return await this.repo.filter_by_user(user_id)
    }
        
}

export const message_service = new MessageService(message_repository)