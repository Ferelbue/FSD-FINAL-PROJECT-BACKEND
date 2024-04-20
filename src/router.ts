import { Router } from 'express';
import authRoutes from "./routes/auth.routes";

const router = Router();

router.use('/auth', authRoutes)
// router.use('/users', usersRoutes)
// router.use('/posts', postsRoutes)


export default router;