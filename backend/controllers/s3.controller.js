import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import s3Client from '../config/awsConfig.js';

export const uploadImageToS3 = async (req, res) => {
  const file = req.file;
  const fileName = `products/${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export const uploadProfilePictureToS3 = async (req, res) => {
  const file = req.file;
  const fileName = `profile-pictures/${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading profile picture to S3:', error);
    res.status(500).json({ success: false, message: 'Error uploading profile picture' });
  }
};