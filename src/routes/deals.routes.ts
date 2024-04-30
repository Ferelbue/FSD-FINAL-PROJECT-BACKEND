
import { Router } from "express";
import { approveDeal, statusDeal } from "../controllers/dealsController";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/:productId/:userUserId', auth, statusDeal)
router.put('/:productId/:userUserId', auth, approveDeal)


export default router


