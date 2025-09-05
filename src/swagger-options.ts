import { Options } from "swagger-jsdoc";
export const swaggerOptions : Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
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
  },

  apis : [   './src/**/*.js',           
    './src/**/*.ts'
]
};
