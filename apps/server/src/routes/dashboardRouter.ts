import { Router } from "express";
import {
    dashboardGet,
    profileGet,
    profilePost
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/dashboard").get(requireAuth, dashboardGet);
router.route("/profile").get(requireAuth, profileGet);
router.route("/profile").post(requireAuth, profilePost);



export { router as dashboardRouter };
