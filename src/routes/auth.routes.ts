import { Router } from "express";
import { singin, profile, signup } from "../controllers/auth.controller";
import { TokenValidator } from "../libs/validateToken";
const router : Router = Router();

router
    .post('/signup', signup )
    .post('/singin', singin )
    .get('/profile', TokenValidator ,profile );

export default router;