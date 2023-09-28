import { signupPost,signupGet } from "../controllers/signup";
import express, { Router } from "express";

const router: Router = express.Router();

router.route("/signup").post(signupPost).get(signupGet); 

export default router;