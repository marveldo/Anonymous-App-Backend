import {S3Client , PutObjectCommand} from "@aws-sdk/client-s3"
import { Settings } from "../settings"
import { Readable } from "stream"
import path from "path"

export class S3Service {
    private static instance: S3Client | null = null

    private constructor() { }

    public static get s3_obj(): S3Client {
        if (!S3Service.instance) {
            const { aws_access_key_id, aws_s3_region, aws_secret_access_key } = Settings

            if (!aws_access_key_id || !aws_s3_region || !aws_secret_access_key) {
                throw new Error("AWS S3 configuration is missing");
            }
            S3Service.instance = new S3Client({
                region: aws_s3_region,
                credentials: {
                    accessKeyId: aws_access_key_id,
                    secretAccessKey: aws_secret_access_key
                }
            })
        }
        return S3Service.instance
    }

    public static async uploadFileToS3(buffer: Buffer, originalName: string, folder_name: string): Promise<string> {
      const s3_Bucket_name = Settings.aws_storage_bucket_name
      if(!s3_Bucket_name) throw new Error("S3 Bucket name not found")
     const extension = path.extname(originalName)
     const filename = `profile-${Date.now()}${extension}`
      const key = `${folder_name}/${filename}`

      const params = {
            Bucket: s3_Bucket_name,
            Key: key,
            Body: Readable.from(buffer),
            ContentLength : buffer.length
        };
      
    try {
        await S3Service.s3_obj.send(new PutObjectCommand(params))
        return `https://${s3_Bucket_name}.s3.${Settings.aws_s3_region}.amazonaws.com/${key}`
    }
    catch (error) {
        throw new Error(`${error}`)
    }

    }


}