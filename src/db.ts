import {PrismaClient} from "./generated/prisma"



class PrismaSingleInstance {
    private static instance : PrismaClient | null

    private constructor () {}

    public static get database_obj () : PrismaClient {
         if(!PrismaSingleInstance.instance){
            PrismaSingleInstance.instance = new PrismaClient()
         }
         return PrismaSingleInstance.instance
    }
    public static async disconnect() : Promise<void> {
        if(PrismaSingleInstance.instance){
            await PrismaSingleInstance.instance.$disconnect()
            PrismaSingleInstance.instance = null
        }
    }
}

export default PrismaSingleInstance