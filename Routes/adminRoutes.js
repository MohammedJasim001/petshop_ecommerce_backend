import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { adminLogin } from "../Controllers/Admin/adminAuthController.js"
import { viewAllUsers } from "../Controllers/Admin/adminUserController.js"
import { adminToken } from "../Middlewares/adminAuthMiddleware.js"

const router = express.Router()

router.post('/login',tryCatchMiddleware(adminLogin))

router.use(adminToken)
router.get('/viewusers',tryCatchMiddleware(viewAllUsers))

export default router