import { Router } from "express";
import {
  dashboardGet,
  profileGet,
  profileDELETE,
  profilePATCH,
  changePassword,
} from "../controllers";

import { requireAuth } from "../middleware";

const router: Router = Router();

router.route("/Home").get(requireAuth, dashboardGet);
router.route("/dashboard").get(requireAuth, dashboardGet);
router.route("/profile").get(requireAuth, profileGet);
router.route("/profile").patch(requireAuth, profilePATCH);
router.route("/profile").delete(requireAuth, profileDELETE);
router.route("/changePassword").post(requireAuth, changePassword);

export { router as dashboardRouter };
