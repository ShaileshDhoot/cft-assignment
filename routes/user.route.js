import express from 'express'
const router = express.Router()
import {login, logout, updateUser, createUser} from '../controller/user.controller.js'

import authenticateUser from '../middleware/auth.middleware.js'

router.post('/create', createUser);

router.put('/update', authenticateUser, updateUser);

router.post('/login', login);

router.post('/logout', logout);

export default router