import { Router } from "express";
import { getRoles } from "../controllers/user.controller";


const router : Router = Router();

router.get('/', async (req, res) => {
    res.send('Fetching...')
})

router.get('/getUser', (req, res) => {
    res.send('Fetching...1 ')
})

router.get('/getRoles', getRoles)

export default router;