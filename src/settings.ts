export class Settings{
    static port : number = Number(process.env.PORT) || 3000;
    static database_url : string = process.env.DATABASE_URL || ''
    static prod_database_url : string = process.env.PROD_DATABASE_URL || ''
    static jwt_secret : string | undefined  = process.env.JWT_SECRET 
}