
import { Router } from "express";
import { addToFavorite, categoryProducts, createProduct, deleteProduct, getMyFavorites, getMyProducts, getProductById, getProducts, productFavorite, productFavorites, productReviews, reviewProduct, updateProduct, uploadImage } from "../controllers/productController";
import { auth } from "../middlewares/auth";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const router = Router()

router.get('/', getProducts)
router.get('/own', auth, getMyProducts)
router.get('/favorites/user', auth, getMyFavorites)
router.get('/:id', getProductById)
router.post('/', auth, createProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)
router.post('/favorite/:id', auth, addToFavorite)
router.get('/favorite/:id', auth, productFavorite)
router.post('/review/:id', auth, reviewProduct)
router.get('/favorites/:id', auth, productFavorites)
router.get('/reviews/:id', auth, productReviews)
router.get('/category/:id', categoryProducts)

router.post('/image', auth, upload.single('image'), uploadImage)

export default router


