import express from "express"
import { login, register } from "../controllers/auth.controllers.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validate.middlewares.js"
import { loginSchema, registerSchema } from "../validations/user.validation.js"

const router = express.Router()

router.post("/register", validate(registerSchema), register)

router.post("/login", validate(loginSchema),login)

router.get("/me", verifyJwt, (req, res)=>{
    res.status(200).json({
        success : true,
        user : req.user
    })
})

export default router