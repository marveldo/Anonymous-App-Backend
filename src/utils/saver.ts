import fs from 'fs'
import path from 'path'
import multer from "multer"
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { BadRequest } from './errors';
import { on } from 'events';

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
 
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new BadRequest('Bad File Format'));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(), 
  
  fileFilter : fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  
})

export const recordingfilefilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/ogg' || file.mimetype === 'audio/webm' || file.mimetype === 'audio/3gp'  || file.mimetype === 'audio/mp4'|| file.originalname.endsWith('.opus')) {
    cb(null, true);
  } else {
    cb(new BadRequest('Bad File Format'));
  }

};

export const recording_upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: recordingfilefilter,
  limits: {
    fileSize: 10 * 1024 * 1024 
  },
});



export async function saveFileToDisk(buffer: Buffer, originalName: string, folder_name : string): Promise<string> {
  const uploadsDir = path.join(__dirname, `../public/${folder_name}`);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const extension = path.extname(originalName)
  const filename = `profile-${Date.now()}${extension}`
  const filePath = path.join(uploadsDir, filename)

  fs.writeFileSync(filePath, buffer)
  return filename
}