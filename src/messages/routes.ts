import { Router } from "express";
import { message_controller } from "./messages.controller";
import { recording_upload } from "../utils/saver";
import { authenticationMiddleware } from "../utils/authentication-middleware";

const message_router : Router = Router()

message_router.post('/:id/send/', recording_upload.single('recorded_file'), message_controller.createMessage)
message_router.get('/', authenticationMiddleware, message_controller.getMessagesByUser)
export {message_router}

