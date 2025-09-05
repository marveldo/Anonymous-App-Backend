import { Router } from "express";
import { userController } from "./user.controller";
import { upload } from "../utils/saver";
import {authenticationMiddleware} from "../utils/authentication-middleware";

const user_router : Router = Router()

user_router.post('/signUp/', upload.single('profile_pic'), userController.createUser);
user_router.put('/update/', authenticationMiddleware,  upload.single('profile_pic'), userController.updateUser);
user_router.delete('/delete/', authenticationMiddleware, userController.deleteUser);

export {user_router}
