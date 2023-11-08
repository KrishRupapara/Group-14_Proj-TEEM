import { Router } from "express";
import {
    dashboardGet,
    profileGet
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/dashboard").get(requireAuth, dashboardGet);
router.route("/profile").get(requireAuth, profileGet);


export { router as dashboardRouter };
