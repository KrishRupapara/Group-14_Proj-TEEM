import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    getWorkspace,
    addMembersPost,
    deleteWorkspaceGet,
} from "../controllers";

import{requireAuth, authorizeManager, authorizeMember} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

router.route("/getWorkspace/:wsid")
    .get(requireAuth, authorizeMember, getWorkspace);

router.route("/addMembers")
    .post(requireAuth, authorizeManager, addMembersPost); 

router.route("/:wsid/delete")
    .get(requireAuth, authorizeManager, deleteWorkspaceGet);

export { router as workspaceRouter };
