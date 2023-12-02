import { Router } from "express";
import { meetDashboard, scheduleMeetHandler } from "../controllers";
import { deleteMeet, getCalendarEvents } from "../controllers/meetController";
import {
  requireAuth,
  authorizeMember,
  wsExist,
  meetExist,
  authorizeInvitee,
} from "../middleware";
import { showInvitees } from "../controllers/meetController";

const router: Router = Router();

router
  .route("/scheduleMeet/:wsID")
  .post(requireAuth, wsExist, authorizeMember, scheduleMeetHandler);

router.route("/events").get(getCalendarEvents);

router.route("/deleteMeet/:meetID").get(requireAuth, deleteMeet);
router
  .route("/:wsID/:meetID/showInvitees")
  .get(requireAuth, authorizeMember, showInvitees);
router
  .route("/workspace/:wsID/meet/:meetID/dashboard")
  .get(
    requireAuth,
    wsExist,
    authorizeMember,
    meetExist,
    authorizeInvitee,
    meetDashboard
  );

export { router as meetRouter };
