
import { Router } from "express";
import { deleteUser, getNumberUsers, getUserByID, getUserProfile, getUsers, updateUserProfile, updateUserProfileById, updateUserRole } from "../controllers/userController";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/profile', auth, getUserProfile)
router.put('/profile', auth, updateUserProfile)
router.get('/', auth, getUsers)
router.get('/number', auth, getNumberUsers)
router.delete('/:id', auth, deleteUser)
router.get('/:id', auth, getUserByID)
router.put('/:id', auth, updateUserProfileById)
router.put('/:id/role', auth, updateUserRole)

export default router


