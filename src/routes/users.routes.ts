
import { Router } from "express";
import { getUserProfile } from "../controllers/userController";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/profile', auth, getUserProfile)
// router.post('/login', login)

export default router


