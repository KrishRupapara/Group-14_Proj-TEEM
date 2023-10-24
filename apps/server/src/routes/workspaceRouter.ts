import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    deleteWorkspacePost,
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

router.route("/deleteWorkspace/:wsid").post(requireAuth,deleteWorkspacePost);

export { router as workspaceRouter };
