
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createMessage, deleteMessage, getMessages, getUserChats } from "../controllers/chatsController";

const router = Router()

router.get('/', auth, getUserChats)
router.get('/:productId/:userUserId', auth, getMessages)
router.post('/:productId/:userUserId', auth, createMessage)
router.delete('/:id', auth, deleteMessage)

export default router


