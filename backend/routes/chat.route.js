import express from 'express';
import { createChat, findChat, findUserChats } from "../controllers/chat.controller.js";


const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId/:productId", findChat);

export default router;