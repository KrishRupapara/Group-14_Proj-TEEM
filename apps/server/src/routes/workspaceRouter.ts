import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(createWorkspacePost);

export { router as workspaceRouter };
