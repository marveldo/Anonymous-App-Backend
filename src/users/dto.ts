import { usercreateschema, userupdatescema } from "./schema";
import z from "zod";
import { BadRequest } from "../utils/errors";

export class UserDto {

    static validate (data : z.infer<typeof usercreateschema>){
         const{
            error,
            success,
            data : parsed_data
         } = usercreateschema.safeParse(data)

         if (success) return parsed_data

         throw new BadRequest(error.message)
    }

    static validate_update(data :  z.infer<typeof userupdatescema>){
        const {
            error,
            success,
            data : parsed_data
        } = userupdatescema.safeParse(data)

        if (success) return parsed_data

        throw new BadRequest(error.message)
    }
}
  