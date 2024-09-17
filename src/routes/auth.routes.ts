import express, { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const route = express.Router();

route.post('/signup',signup)
route.post('/login',login)

export default route;