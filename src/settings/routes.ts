import { Router } from "express";
import { authenticationMiddleware } from "../utils/authentication-middleware";
import { settings_controller } from "./settings.controller";

const settings_router : Router = Router()

settings_router.get('/', authenticationMiddleware , settings_controller.getSettings)
settings_router.put('/', authenticationMiddleware, settings_controller.updateSettings)

export {settings_router}

