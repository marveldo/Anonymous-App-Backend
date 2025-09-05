import { settingsschema } from "./schema";
import { BadRequest } from "../utils/errors";
import z from "zod";

export class SettingsDto {
    static validate (data : z.infer<typeof settingsschema> ){
        const {
         success,
         error ,
         data : parsed_data
        } = settingsschema.safeParse(data)

        if (success) return parsed_data

        throw new BadRequest(error.message)
    }
}