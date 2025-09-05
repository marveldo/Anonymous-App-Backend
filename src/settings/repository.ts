import PrismaSingleInstance from "../db";
import { PrismaClient } from "../generated/prisma";
import { NotFound } from "../utils/errors";


interface Settingdata {
    paused : boolean
}

export class SettingsRepository {
    constructor(private prisma: PrismaClient){}

    async get_settings_by_user_id(user_id : string){
        const settings = await this.prisma.settings.findUnique({
            where : { user_id : user_id }
        })
        if(!settings) throw new NotFound("Settings not found")
        return settings
    }

    async update_settings_by_user_id(user_id : string , validated_data : Settingdata) {
        const settings = await this.prisma.settings.update({
            where : {
                user_id : user_id
            },
            data : validated_data
        })

        return settings
    }
}

export const settings_repository = new SettingsRepository(PrismaSingleInstance.database_obj)
