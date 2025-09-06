import { Options } from "swagger-jsdoc";
import path from "path";
export const swaggerOptions : Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  servers: [
      {
        // Force HTTPS in production
        url: process.env.NODE_ENV === 'production' 
          ? 'https://anonymous-app-backend-rosy.vercel.app/'
          : `http://localhost:${process.env.PORT || 3000}/`,
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server (HTTPS)' 
          : 'Local development server'
      }
    ],
  components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    },
  apis : [      path.join(__dirname, '**', '*.js'),
    path.join(__dirname, '**', '*.ts')
]
};

