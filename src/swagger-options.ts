import swaggerAutogen from "swagger-autogen";
var outputFile = "./swagger.json";
var endpointsFiles = ["./routes.ts"];
var config = {};

export const generate_docs = ()=> {
  swaggerAutogen(outputFile, endpointsFiles, config);
}