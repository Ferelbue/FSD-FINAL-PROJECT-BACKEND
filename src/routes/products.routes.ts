
import { Router } from "express";
import { addToFavorite, createProduct, deleteProduct, getMyProducts, getProductById, getProducts, productFavorites, reviewProduct, updateProduct } from "../controllers/productController";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/', getProducts)
router.get('/own', auth, getMyProducts)
router.get('/:id', auth, getProductById)
router.post('/', auth, createProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)
router.put('/favorite/:id', auth, addToFavorite)
router.post('/review/:id', auth, reviewProduct)
router.get('/favorites/:id', auth, productFavorites)
// router.post('/login', login)

export default router


