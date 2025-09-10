import { user_repository, Userrepository } from "./repository";
import { UserDto } from "./dto";
import { Request } from "express";
import { saveFileToDisk } from "../utils/saver";
import { BadRequest } from "../utils/errors";
import { Users } from "../generated/prisma";
import jwt from "jsonwebtoken";
import { Settings } from "../settings";
import { S3Service } from "../utils/s3";

interface ResponseData {
    access_token : string ,
    user  : Users
}

export class Userservice {
   
    constructor(private repo : Userrepository){}

    async create(request : Request){
        const body = request.body
        const value = UserDto.validate(body)
        let file_url

        const user_exists = await this.repo.get_by_username(value.username)
        if(user_exists) throw new BadRequest("Username already exists")
        if(!request.file){
           file_url = `${request.protocol}://${request.host}/Images/default.jpeg`
        }
        else {
           file_url = await S3Service.uploadFileToS3(request.file.buffer, request.file.originalname, 'Images', request.file.mimetype)
           
        }

        const data = {
            username : value.username,
            profile_picture : file_url
        }
        
        return await this.repo.create(data)
    }

    signIn(user : Users) : ResponseData {
        const secret = Settings.jwt_secret
        if(!secret) throw new Error("Secret key not found")
        const payload = { id : user.id , username : user.username}
        const token = jwt.sign(payload , secret , {expiresIn : '36500d'})
        return {access_token : token, user : user}
    }

    async update(id: string, request : Request): Promise<Users | null> {
        const body = request.body
        const value = UserDto.validate_update(body)
        let file_url : string | undefined = undefined
        const user = await this.repo.get_by_id(id)
        if(!user) throw new BadRequest("User not found")
        if(request.file){
           file_url = await S3Service.uploadFileToS3(request.file.buffer, request.file.originalname, 'Images', request.file.mimetype)
        }
        if(value.username){
            const user_exists = await this.repo.get_by_username(value.username)
            if(user_exists && user_exists.id !== id) throw new BadRequest("Username already exists")
        }

        const data = {
            username : value.username ? value.username : user.username,
            profile_picture : file_url ? file_url : user.profile_picture
        }
        return await this.repo.UpdatebyId(id , data)

    }

    async delete(id: string): Promise<void> {
          await this.repo.deletebyId(id)
          return
    }
}

export const user_Service = new Userservice(user_repository)