import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getChats } from "../controllers/chat.controller";

const router: Router = Router();

router.get('/get-previous-chats/:roomId', authMiddleware, getChats);

export default router