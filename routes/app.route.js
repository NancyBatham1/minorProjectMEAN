import { Router } from "express";
import { register, login} from '../controllers/auth.controller.js'
import { superadminProfile, adminProfile, managerProfile, userProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/superadmin/dashboard',verifyToken, authorizedRoles('super_admin'), superadminProfile);
router.get('/admin/dashboard',verifyToken, authorizedRoles('admin'), adminProfile);
router.get('/manager/dashboard',verifyToken,authorizedRoles('admin', 'manager'), managerProfile);
router.get('/user/dashboard',verifyToken, authorizedRoles('admin', 'manager', 'user'),userProfile);

export default router;