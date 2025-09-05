import {Request , Response , NextFunction} from "express"
import { Unauthorized } from "./errors"
import jwt ,{ JwtPayload } from "jsonwebtoken" 
import { Users } from "../generated/prisma"
import { Settings } from "../settings"
import { user_repository } from "../users/repository"



export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const jwtSecret = Settings.jwt_secret;
        
        if (!jwtSecret) {
            throw new Error("JWT Secret not defined in environment variables");
        }
        
        if (!authHeader) {
            throw new Unauthorized("No token provided");
        }
        
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Unauthorized("No token provided");
        }
        
       
        const decoded = await new Promise<any>((resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    return reject(new Unauthorized("Invalid token"));
                }
                resolve(decoded);
            });
        });
        
        if (typeof decoded !== 'object' || decoded === null) {
            throw new Unauthorized("Invalid token payload");
        }
        
        const id = (decoded as JwtPayload).id as string;
        if (!id) {
            throw new Unauthorized("User ID missing in token");
        }
        
        const user = await user_repository.get_by_id(id);
        if (!user) {
            throw new Unauthorized("User not found");
        }
        
        req.user = user as Users;
        next();
        
    } catch (error) {
        
        next(error);
    }
};
