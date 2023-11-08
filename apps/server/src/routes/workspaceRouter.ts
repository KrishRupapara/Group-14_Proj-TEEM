import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    getWorkspace,
    settingsWSGet,
    settingsWSPost,
    addMembersPost,
    deleteWorkspacePost,
    getPeople,
    getYourWork,
    getUpcoming,
    getStream,
} from "../controllers";

import{requireAuth, authorizeManager, authorizeMember} from "../middleware" 
const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

// router.use("/api", meetRouter);
// router.route("/:wsid")
//     .get(requireAuth, authorizeMember, getWorkspace);

router.route("/:wsID/stream")
    .get(requireAuth, authorizeMember, getStream);

router.route("/:wsID/people")
    .get(requireAuth, authorizeMember, getPeople);
    
router.route("/:wsID/yourWork")
    .get(requireAuth, authorizeMember, getYourWork);
// router.route("/:wsid/upcoming")
//     .get(requireAuth, authorizeMember, getUpcoming);

router.route("/:wsid/settings")
    .get(requireAuth, authorizeManager, settingsWSGet)
    .post(requireAuth, authorizeManager, settingsWSPost);

router.route("/addMembers/:wsid")
    .post(requireAuth, authorizeManager, addMembersPost); 

router.route("/deleteWorkspace")
    .post(requireAuth, authorizeManager, deleteWorkspacePost);
router.route("/deleteWorkspace")
    .post(requireAuth, authorizeManager, deleteWorkspacePost);

export { router as workspaceRouter };
