import { Router } from "express";
import { createUserRegistration } from "../controller/userRegistration.js";
import { validateUser } from "../helpers/validator.js";

const router = Router()

router.post('/registration', validateUser , createUserRegistration)

export default router
