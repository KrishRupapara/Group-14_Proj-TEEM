import express, { Router } from "express";

import  signup  from "./signup";
import  login  from "./login"; 
import logout from "./logout";

const router: Router = express.Router();

router.use(signup);
router.use(login);
router.use(logout);

export default router;
