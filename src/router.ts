import { Router } from 'express';
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import chatsRoutes from "./routes/chats.routes";

const router = Router();

router.use('/auth', authRoutes)
router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/chats', chatsRoutes)

export default router;