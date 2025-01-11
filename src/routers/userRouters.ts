import { Router } from "express";
import { Onboarding } from "../controllers/auth";


export const authRouter = Router()

authRouter
.post("/signup", Onboarding.signup)
.post("/login", Onboarding.login)