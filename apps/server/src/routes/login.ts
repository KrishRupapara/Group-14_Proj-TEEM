import { loginGet,loginPost } from "../controllers/login";
import express, { Router } from "express";
// import JsonWeb = require("jsonwebtoken")



const router: Router = express.Router();

// login.use(cookieParser())
router.route("/login").post(loginPost).get(loginGet); 

export default router;