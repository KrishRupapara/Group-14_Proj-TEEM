import { Router } from "express";
import { scheduleMeetHandler } from "../controllers";
import { requireAuth } from "../middleware";
import { deleteMeet, getCalendarEvents } from "../controllers/meetController";

const router: Router = Router();

router
  .route("/scheduleMeet/:userID/:workspaceID")
  .post(requireAuth, scheduleMeetHandler);

router.route("/events").get(getCalendarEvents);

router.route("/deleteMeet/:meetID").get(requireAuth,deleteMeet);

export { router as meetRouter };
