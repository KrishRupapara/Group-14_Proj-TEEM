import { loginGet,loginPost } from "../controllers/login";
import express, { Router } from "express";
import cookieParser = require("cookie-parser");
import JsonWeb = require("jsonwebtoken")



const login: Router = express.Router();

login.use(cookieParser())
login.route("/login").post(loginPost).get(loginGet); 

export default login;