import express from "express";
import { signup } from "../controllers/auth.controller";

const route = express.Router();

route.post('/signup',signup)

export default route;