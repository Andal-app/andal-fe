import express from "express";
import { 
  getCutiData, 
  getCutiById, 
  createCuti,
  updateCuti,
  deleteCuti
} from "../controllers/CutiController.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/cutidata', verifyUser, getCutiData);
router.get('/cutidata/:id', verifyUser, getCutiById);
router.post('/cutidata', verifyUser, createCuti);
router.patch('/cutidata/:id', verifyUser, updateCuti);
router.delete('/cutidata/:id', verifyUser, deleteCuti);

export default router;