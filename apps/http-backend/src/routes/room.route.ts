import { Router } from "express";
import { getRoomId } from "../controllers/room.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.get('/get-roomId', authMiddleware, getRoomId);

export default router;