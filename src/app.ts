import express, {Request , Response , Application, NextFunction} from "express"
import { mainrouter } from "./routes"
import { swaggerOptions } from "./swagger-options"
import  swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Settings } from "./settings"
import { error_handler } from "./utils/errors"
import PrismaSingleInstance from "./db"
import path, { parse } from "path"
import { Users } from "generated/prisma"
import cors, {CorsOptions} from "cors"
import { generate_docs } from "./swagger-options"
import swaggerdocs from "./swagger.json"

const app : Application = express()
const port = Settings.port


declare global {
  namespace Express {
    interface Request {
      user? : Users | null
    }
  }
}



const corsOptions : CorsOptions = {
  origin : [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173'
  ],
  methods : ['GET' , 'POST' , 'PUT' , 'DELETE' , 'PATCH'],
  allowedHeaders : ['Content-Type' , 'Authorization', 'Accept'],
  credentials : true,
  optionsSuccessStatus : 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use((req : Request , res : Response , next : NextFunction) : void => {
    const startTime = Date.now()

   res.on('finish', ()=> {
    const elapsedtime = Date.now() - startTime
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${elapsedtime}ms`)
   })

   next()
})



app.use('/',mainrouter)

const swaggerspec = swaggerJsdoc(swaggerOptions)


app.use('', express.static(path.join(__dirname, 'public/')))



app.use('/docs/',
  express.static(
        path.join(__dirname, 'node_modules', 'swagger-ui-dist')
   ),
  swaggerUi.serve, 
  (req : Request , res : Response , next : NextFunction) => {
 const protocol = req.protocol
 const host = req.get('host')
 const baseUrl = `${protocol}://${host}`
 const dynamicSpec = {
    ...swaggerspec,
    servers: [
      {
        url: baseUrl,
        description: 'Current server',
      },
    ],
  };
  
  return swaggerUi.setup(swaggerdocs , {
    swaggerOptions : {
       customCssUrl : 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css',
       persistAuthorization : true,    
    }
  })(req, res, next);
})


app.use('/{*any}', (req : Request , res : Response) : void =>{
    res.status(404).json({
        error : 'Not found',
        message : `Route ${req.originalUrl} not Found`
    })
})



app.use(error_handler)

const server = app.listen(port , () : void=> {
       PrismaSingleInstance.database_obj
       console.log(`Server listening on port ${port}`)
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
})

process.on('SIGTERM',(): void => {
    PrismaSingleInstance.disconnect()
    console.log('SIGTERM received shutting down geracefully')
    server.close(()=>console.log('process terminated'))
    
})

export default app