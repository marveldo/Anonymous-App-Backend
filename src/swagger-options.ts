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
