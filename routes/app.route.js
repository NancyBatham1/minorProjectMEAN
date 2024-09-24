import { Router } from "express";
import { register, login} from '../controllers/auth.controller.js'
import { profile } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);

export default router;