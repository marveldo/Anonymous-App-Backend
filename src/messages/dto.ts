import { createmessageschema } from "./schema";
import z from "zod"
import { BadRequest } from "../utils/errors";

export class MessageDto {
    static validate (data : z.infer<typeof createmessageschema>){
        const{
           error,
           success,
           data : parsed_data
        } = createmessageschema.safeParse(data)

        if (success) return parsed_data

        throw new BadRequest(error.message)
    }
}

