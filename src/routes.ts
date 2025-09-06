import { Router , Request , Response } from "express";
import { user_router } from "./users/routes";
import { message_router } from "./messages/routes";
import { settings_router } from "./settings/routes";
const mainrouter : Router = Router()
import './users/swagger';
import './messages/swagger'; 
import './settings/swagger';




mainrouter.use('/auth', user_router);
mainrouter.use('/messages', message_router);
mainrouter.use('/settings', settings_router);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello world message
 * 
 *     responses:
 *       200:
 *         description: A Simple message 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 */
mainrouter.get('',(req: Request , res : Response)=> {
     res.status(200).json({
        'message' : 'Hello World'
     })
})


export {mainrouter}



