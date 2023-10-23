import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    addMembersPost,
    addMembersGet
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

router.route("/addMembers")
    .get(requireAuth, addMembersGet)
    .post(addMembersPost);

export { router as workspaceRouter };
