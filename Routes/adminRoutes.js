import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { adminLogin } from "../Controllers/Admin/adminAuthController.js"
import { blockUser, unblockUser, viewAllUsers, viewUserById, viewUserByName } from "../Controllers/Admin/adminUserController.js"
import { adminToken } from "../Middlewares/adminAuthMiddleware.js"
import { adminViewAllProducts, adminViewProductByCategory } from "../Controllers/Admin/adminProductController.js"

const router = express.Router()

//adminLoign
router.post('/login',tryCatchMiddleware(adminLogin))

router.use(adminToken)
//adminUserControll
router.get('/users/viewusers',tryCatchMiddleware(viewAllUsers))
router.get('/users/viewuserbyid/:userId',tryCatchMiddleware(viewUserById))
router.get('/users/viewuserbyname/:username',tryCatchMiddleware(viewUserByName))
router.put('/users/blockuser/:userId',tryCatchMiddleware(blockUser))
router.put('/users/unblockuser/:userId',tryCatchMiddleware(unblockUser))

//adminProductControll
router.get('/products/viewproducts',tryCatchMiddleware(adminViewAllProducts))
router.get('/products/category/:productcategory',tryCatchMiddleware(adminViewProductByCategory))


export default router