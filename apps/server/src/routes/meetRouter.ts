import { Router } from "express";
import { scheduleMeetHandler } from "../controllers";
import { requireAuth } from "../middleware";
import { getCalendarEvents } from "../controllers/meetController";

const router: Router = Router();

router
  .route("/scheduleMeet/:userID/:workspaceID")
  .post(requireAuth, scheduleMeetHandler);

router.route("/events").get(getCalendarEvents);

export { router as meetRouter };
