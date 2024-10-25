import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { adminLogin } from "../Controllers/Admin/adminAuthController.js"
import { blockUser, unblockUser, viewAllUsers, viewUserById, viewUserByName } from "../Controllers/Admin/adminUserController.js"
import { adminToken } from "../Middlewares/adminAuthMiddleware.js"
import { adminAddProduct, adminDeleteProduct, adminUpdateProduct, adminViewAllProducts, adminViewProductByCategory } from "../Controllers/Admin/adminProductController.js"
import { uploadImage } from "../Middlewares/imageUploadMiddleware.js"
import { orderDetails, orderStats, } from "../Controllers/Admin/adminOrderController.js"

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
router.post('/products/addproducts',uploadImage,tryCatchMiddleware(adminAddProduct))
router.put('/products/updateproduct/:productId',uploadImage,tryCatchMiddleware(adminUpdateProduct))
router.delete('/products/deleteproduct/:productId',tryCatchMiddleware(adminDeleteProduct))

//adminOrderController
router.get('/orders/orderdetails',tryCatchMiddleware(orderDetails))
router.get('/orders/orderstats',tryCatchMiddleware(orderStats))

export default router