import express from 'express';
import { createMessage, getMessages, getMostRecentMessage, setAllMessagesRead } from '../controllers/message.controller.js';

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.get("/:chatId/recent", getMostRecentMessage);
router.patch("/read", setAllMessagesRead);

export default router;