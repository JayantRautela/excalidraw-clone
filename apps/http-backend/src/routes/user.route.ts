import { Router } from "express";
import { createRoom, signin, signup } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create-room', authMiddleware, createRoom);

export default router;