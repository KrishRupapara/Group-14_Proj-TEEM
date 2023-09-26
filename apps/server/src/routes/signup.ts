import { signupPost,signupGet } from "../controllers/signup";
import express, { Router } from "express";

const signup: Router = express.Router();

signup.route("/signup").post(signupPost).get(signupGet); 

export default signup;