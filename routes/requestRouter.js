import { Router } from 'express';
import { createRequest, getAllRequest } from '../controllers/requestController.js';
import { isAdmin, isAuthenticated } from '../middleswares/auth.js';
const router = Router();

router.post('/', createRequest);
router.get('/',isAuthenticated, isAdmin, getAllRequest);


export default router;