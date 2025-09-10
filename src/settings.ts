export class Settings{
    static port : number = Number(process.env.PORT) || 3000;
    static database_url : string = process.env.DATABASE_URL || ''
    static prod_database_url : string = process.env.PROD_DATABASE_URL || ''
    static jwt_secret : string | undefined  = process.env.JWT_SECRET 
    static aws_access_key_id : string | undefined = process.env.AWS_ACCESS_KEY_ID
    static aws_secret_access_key : string | undefined = process.env.AWS_SECRET_ACCESS_KEY
    static aws_storage_bucket_name : string | undefined = process.env.AWS_STORAGE_BUCKET_NAME
    static aws_s3_signature_version : string | undefined = process.env.AWS_S3_SIGNATURE_VERSION
    static aws_s3_region : string | undefined = process.env.AWS_S3_REGION
}