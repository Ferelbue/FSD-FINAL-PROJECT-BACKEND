
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getMessages, getUserChats } from "../controllers/chatsController";

const router = Router()

router.get('/', auth, getUserChats)
router.get('/:productId/:userUserId', auth, getMessages)


export default router


