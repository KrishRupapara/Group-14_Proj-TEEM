import { signup } from "../controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.route("/signup").post(signup);

export default router;
