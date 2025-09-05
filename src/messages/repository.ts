import { PrismaClient } from "../generated/prisma";
import PrismaSingleInstance from "../db";



interface MessageData {
    recording : string |  null;
    content : string | null;
    user_id : string ;
}
export class MessageRepository {
    
    constructor(private prisma: PrismaClient) {}
    
    create(data : MessageData ) {
        
        const message = this.prisma.messages.create({
            data : data
        })
        return message
    }

    filter_by_user(user_id : string) {
       const messages = this.prisma.messages.findMany({
            where : {
                user_id : user_id   
            },
            include : {
                user : true
            }    
        })
   
         return messages
    }
   }

export const message_repository = new MessageRepository(PrismaSingleInstance.database_obj)

