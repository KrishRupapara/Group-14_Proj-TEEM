import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    getWorkspace,
    addMembersPost,
    deleteWorkspacePost,
    getPeople,
    getYourWork,
    getUpcoming,
} from "../controllers";

import{requireAuth, authorizeManager, authorizeMember} from "../middleware" 

const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

// router.use("/api", meetRouter);
// router.route("/:wsid")
//     .get(requireAuth, authorizeMember, getWorkspace);

router.route("/:wsID/people")
    .get(requireAuth, authorizeMember, getPeople);
router.route("/:wsID/yourWork")
    .get(requireAuth, authorizeMember, getYourWork);
// router.route("/:wsid/upcoming")
//     .get(requireAuth, authorizeMember, getUpcoming);

router.route("/addMembers")
    .post(requireAuth, authorizeManager, addMembersPost); 

router.route("/deleteWorkspace")
    .post(requireAuth, authorizeManager, deleteWorkspacePost);

export { router as workspaceRouter };
