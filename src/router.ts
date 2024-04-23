import { Router } from 'express';
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";

const router = Router();

router.use('/auth', authRoutes)
router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
// router.use('/posts', postsRoutes)


export default router;