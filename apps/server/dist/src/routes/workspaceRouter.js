"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.workspaceRouter = router;
router.route("/createWorkspace").post(middleware_1.requireAuth, controllers_1.createWorkspacePost);
router
    .route("/workspace/:wsID")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getWorkspace);
router
    .route("/:wsID/editWSDetails")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.editWSDetailsGet)
    .patch(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.editWsDetailsPATCH)
    .delete(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.deleteWorkspaceDELETE);
router
    .route("/:wsID/stream")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getStream);
router
    .route("/:wsID/people")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getPeople);
router
    .route("/:wsID/allpeople")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getAllPeople);
router
    .route("/:wsID/yourWork")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getYourWork);
router
    .route("/:wsID/yourMeet")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.getYourMeet);
router
    .route("/:wsID/editWSMembers")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.editWSMembersGet)
    .patch(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.editWSMembersPATCH);
//# sourceMappingURL=workspaceRouter.js.map