
import { NotFound } from  "../utils/errors";
import PrismaSingleInstance from "../db";
import { Users } from "../generated/prisma";
import { PrismaClient } from "../generated/prisma";

export class Userrepository {
    constructor(private prisma : PrismaClient){}

    async create(validated_data: {username : string , profile_picture : string}): Promise<Users> {
        const user : Users = await this.prisma.users.create({
            data : {
                ...validated_data ,
                settings : {
                    create : {}
                }
            },
            include : {
                settings : true
            }
        })
        

        return user
    }  
    
    async get_by_id(id : string): Promise<Users | null> {
        const user = await this.prisma.users.findUnique({
            where : {
                id : id
            }
        })
        return user
    }

    async get_by_username(username : string): Promise<Users | null> {
        const user = await this.prisma.users.findUnique({
            where : {
                username : username
             }})
        return user 
    }
    async UpdatebyId(id: string, validated_data : {username? : string , profile_picture? : string}): Promise<Users> {
        const updatedUser = await this.prisma.users.update({
            where: { id: id },
            data: validated_data,
            include : {
                settings : true
            }
        });
        return updatedUser
    }

    async deletebyId(id: string): Promise<void> {
        const user = await this.get_by_id(id)
        if(!user) throw new NotFound("User not found")
        await this.prisma.users.delete({
            where: { id: id }
        });
        return 
    }

}

export const user_repository = new Userrepository(PrismaSingleInstance.database_obj)