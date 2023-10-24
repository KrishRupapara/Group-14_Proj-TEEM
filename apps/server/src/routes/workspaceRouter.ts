import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    addMembersPost,
    addMembersGet,
    deleteWorkspacePost,
} from "../controllers";

import{requireAuth} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

router.route("/addMembers")
    .get(requireAuth, addMembersGet)
    .post(addMembersPost);

router.route("/deleteWorkspace").post(requireAuth,deleteWorkspacePost);

export { router as workspaceRouter };
