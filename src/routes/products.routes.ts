
import { Router } from "express";
import { createProduct, getMyProducts, getProductById, getProducts } from "../controllers/productController";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/', getProducts)
router.get('/own', auth, getMyProducts)
router.get('/:id', auth, getProductById)
router.post('/', auth, createProduct)
// router.post('/login', login)

export default router


