import express from 'express';
import { createMessage, getMessages, getMostRecentMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.get("/:chatId/recent", getMostRecentMessage);

export default router;