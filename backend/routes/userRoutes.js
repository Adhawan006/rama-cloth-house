import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { protect } from "../middleware/authMiddleware.js";

import {
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";



const router = express.Router();

// 📍 Pathway: POST /api/users/register
router.post('/register', registerUser);
router.get("/profile", protect, getUserProfile);


export default router;
