import express from 'express';
import { getUsers, register, login, logout } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';
import { refreshToken } from '../controllers/index.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;