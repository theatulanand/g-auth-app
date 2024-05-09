import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/all-users', verifyToken, getAllUsers)

export default router;
