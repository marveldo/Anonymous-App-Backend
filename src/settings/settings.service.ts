import { settings_repository , SettingsRepository } from "./repository";
import { user_repository } from "../users/repository";
import { SettingsDto } from "./dto";
import { NotFound } from "../utils/errors";
import { Request } from "express";


class Settings_Service {
    constructor (private repo : SettingsRepository){}

    async get_settings_by_user_id(user_id : string){
       const user = await user_repository.get_by_id(user_id)
       if (!user) throw new NotFound('User not Found')
       return await this.repo.get_settings_by_user_id(user_id)
    }

    async update_settings_by_user_id(user_id : string , request : Request){
       const user = await user_repository.get_by_id(user_id)
       if(!user) throw new NotFound('User not Found')
       const value = SettingsDto.validate(request.body)
       let paused : boolean 
       const settings = await this.repo.get_settings_by_user_id(user_id)
       if (value.paused === undefined) paused = settings.paused
       else paused = value.paused
       return await this.repo.update_settings_by_user_id(user_id ,{paused : paused})
   }
}

export const settings_service = new Settings_Service(settings_repository)