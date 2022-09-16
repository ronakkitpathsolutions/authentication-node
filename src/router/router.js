import { Router } from "express";
import { userLogin } from "../controller/userLogin.js";
import { createUserRegistration } from "../controller/userRegistration.js";
import { validateUser } from "../helpers/validator.js";

const router = Router()

router.post('/registration', validateUser , createUserRegistration)
router.post('/login', userLogin)

export default router
