import { Router } from "express";
import { deleteUser } from "../controller/deleteUser.js";
import { forgotPassword } from "../controller/forgotPassword.js";
import { resetPassword } from "../controller/resetPassword.js";
import { userLogin } from "../controller/userLogin.js";
import { createUserRegistration } from "../controller/userRegistration.js";
import { emailValidator, passwordValidator, validateUser } from "../helpers/validator.js";

const router = Router()

router.post('/registration', validateUser, createUserRegistration)
router.post('/login', userLogin)
router.post('/forgot-password', emailValidator, forgotPassword)
router.put('/reset-password', passwordValidator, resetPassword)
router.delete('/delete-user/:id', deleteUser)

export default router
