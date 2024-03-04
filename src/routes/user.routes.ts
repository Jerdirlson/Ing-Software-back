import { Express } from "express";
import express from 'express';
import connection from "../providers/database";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Fetching...')
})

router.get('/getUser', (req, res) => {
    res.send('Fetching...1 ')
})

export default router;