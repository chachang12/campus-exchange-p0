import express from 'express';
import multer from 'multer';
import { uploadImageToS3, uploadProfilePictureToS3 } from '../controllers/s3.controller.js';

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), uploadImageToS3);
router.post('/upload-profile-picture', upload.single('image'), uploadProfilePictureToS3);

export default router;