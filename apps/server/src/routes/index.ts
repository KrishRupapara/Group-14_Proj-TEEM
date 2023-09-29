import express, { Router } from "express";

import  signup  from "./signup";
import  login  from "./login"; 
import resetPassword from "./resetPassword";

const router: Router = express.Router();

router.use(signup);
router.use(login);
router.use(resetPassword);

export default router;
