import { Router } from "express";
import {
    dashboardGet,
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/dashboard").get(requireAuth, dashboardGet);

export { router as dashboardRouter };
