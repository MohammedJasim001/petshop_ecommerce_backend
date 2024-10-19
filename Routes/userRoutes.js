import express from 'express'
import { login, register } from '../Controllers/userController.js'
import { uploadImage } from '../Middlewares/imageUploadMiddleware.js'

const router = express.Router()

router.post('/register',uploadImage,register)
router.post('/login',login)

export default router