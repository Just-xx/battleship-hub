import express from 'express';
import { PatternController } from '../controllers/PatternContoller.js';

const router = express.Router();
router.get('/pattern', PatternController.generate);

export default router;