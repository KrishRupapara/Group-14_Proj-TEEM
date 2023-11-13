import { Router } from "express";
import {
    createWorkspaceGet,
    createWorkspacePost,
    getWorkspace,
    //settingsWSGet,
    //settingsWSPost,
    //addMembersPost,
    deleteWorkspacePost,
    getPeople,
    getYourWork,
    getUpcoming,
    getStream,
    editWSDetailsGet,
    editWsDetailsPost,
    editWSMembersGet,
    editWSMembersPost
} from "../controllers";

import{requireAuth, wsExist, authorizeManager, authorizeMember} from "../middleware" 
const router: Router = Router();

router.route("/createWorkspace")
    .get(requireAuth, createWorkspaceGet)
    .post(requireAuth, createWorkspacePost);

// router.use("/api", meetRouter);
// router.route("/:wsid")
//     .get(requireAuth, authorizeMember, getWorkspace);

router.route("/:wsID/stream")
    .get(requireAuth, wsExist, authorizeMember, getStream);

router.route("/:wsID/people")
    .get(requireAuth, wsExist, authorizeMember, getPeople);
    
router.route("/:wsID/yourWork")
    .get(requireAuth, wsExist, authorizeMember, getYourWork);

router.route("/:wsID/upcoming")
    .get(requireAuth, wsExist, authorizeMember, getUpcoming);

router.route("/:wsID/editWSDetails/:action")
    .get(requireAuth, wsExist, authorizeManager, editWSDetailsGet)
    .post(requireAuth, wsExist, authorizeManager, editWsDetailsPost)

router.route("/:wsID/editWSMembers")
    .get(requireAuth, wsExist, authorizeManager, editWSMembersGet)
    .post(requireAuth, wsExist, authorizeManager, editWSMembersPost)

/*
router.route("/:wsID/settings/:toDo")
    .get(requireAuth, wsExist, authorizeManager, settingsWSGet)
    .post(requireAuth, wsExist, authorizeManager, settingsWSPost);

router.route("/addMembers/:wsID")
    .post(requireAuth, wsExist, authorizeManager, addMembersPost); 

router.route("/deleteWorkspace/:wsID")
    .post(requireAuth, wsExist, authorizeManager, deleteWorkspacePost);

router.route("/deleteWorkspace")
    .post(requireAuth, authorizeManager, deleteWorkspacePost);
*/

export { router as workspaceRouter };
