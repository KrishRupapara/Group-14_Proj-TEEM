import { Router } from "express";
import { scheduleMeetHandler } from "../controllers";

const router: Router = Router();

router.route("/scheduleMeet/:userID/:workspaceID").post(scheduleMeetHandler);

export { router as meetRouter };
