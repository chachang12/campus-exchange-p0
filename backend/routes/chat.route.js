import express from 'express';
import { createChat, findChat, findUserChats, deleteInvalidChats } from "../controllers/chat.controller.js";


const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId/:productId", findChat);
router.delete('/deleteInvalidChats', deleteInvalidChats);

export default router;