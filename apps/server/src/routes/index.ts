import express, { Router } from "express";

import  signup  from "./signup";
import  login  from "./login"; 

const router: Router = express.Router();

router.use(signup);
router.use(login);

export default router;
