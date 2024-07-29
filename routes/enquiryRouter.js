import { Router } from 'express';
import { createEnquiry, getAllEnquiries } from '../controllers/enquiryController.js';
import { isAdmin, isAuthenticated } from '../middleswares/auth.js';
const router = Router();

router.post('/', createEnquiry);
router.get('/', isAuthenticated, isAdmin, getAllEnquiries);

export default router;