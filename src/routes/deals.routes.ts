
import { Router } from "express";
import { approveDeal } from "../controllers/dealsController";
import { auth } from "../middlewares/auth";

const router = Router()

router.put('/:productId', auth, approveDeal)


export default router


