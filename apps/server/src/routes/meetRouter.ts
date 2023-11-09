import { Router } from "express";
import { scheduleMeetHandler } from "../controllers";
import { requireAuth, authorizeMember } from "../middleware";
import { getCalendarEvents, showInvitees } from "../controllers/meetController";

const router: Router = Router();

router
  .route("/scheduleMeet/:userID/:workspaceID")
  .post(requireAuth, authorizeMember, scheduleMeetHandler);

router.route("/events").get(getCalendarEvents);

router.route("/:wsID/:meetID/showInvitees")
  .get(requireAuth, authorizeMember, showInvitees);

export { router as meetRouter };
