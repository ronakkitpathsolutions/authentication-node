import { Router } from "express";
import { changePassword } from "../controller/change-password.js";
import { createProduct } from "../controller/products/createProduct.js";
import { deleteUser } from "../controller/deleteUser.js";
import { forgotPassword } from "../controller/forgotPassword.js";
import { getAllUsers } from "../controller/getAllUsers.js";
import { getUser } from "../controller/getUser.js";
import { resetPassword } from "../controller/resetPassword.js";
import { userLogin } from "../controller/userLogin.js";
import { createUserRegistration } from "../controller/userRegistration.js";
import { emailValidator, passwordValidator, validateUser, validateProducts } from "../middleware/validator.js";
import { getAllProducts } from "../controller/products/getAllProducts.js";

const router = Router()

// auth and user access routes
router.post('/registration', validateUser, createUserRegistration)
router.post('/login', userLogin)
router.post('/forgot-password', emailValidator, forgotPassword)
router.put('/reset-password', passwordValidator, resetPassword)
router.delete('/delete-user/:id', deleteUser)
router.put('/change-password', passwordValidator, changePassword)
router.get('/get-user/:id', getUser)
router.get('/all-user', getAllUsers)


// products routes
router.post('/create-products', validateProducts, createProduct)
router.get('/all-products', getAllProducts)

export default router