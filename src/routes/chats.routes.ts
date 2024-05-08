
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { BringAllMessages, BringAllMessagesNumber, createMessage, deleteMessage, eraseNotification, getMessages, getUserChats, notification } from "../controllers/chatsController";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.get('/', auth, getUserChats)
router.get('/all', auth, isAdmin, BringAllMessages)
router.get('/allNumber', auth, isAdmin, BringAllMessagesNumber)
router.get('/:productId/:userUserId', auth, getMessages)
router.post('/:productId/:userUserId', auth, createMessage)
router.delete('/:id', auth, deleteMessage)
router.get('/notification', auth, notification)
router.put('/notification/:productId/:userUserId', auth, eraseNotification)

export default router


