import { Router } from "express";
import {
    TEEMdashboardGet,
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/TEEMdashboard").get(requireAuth, TEEMdashboardGet);

export { router as TEEMdashboardRouter };
