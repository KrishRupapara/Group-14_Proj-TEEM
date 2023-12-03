"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.taskRouter = router;
router.route("/:wsID/assignTask")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.assignTaskGet)
    .post(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, controllers_1.assignTaskPost);
router
    .route("/workspace/:wsID/task/:taskID/dashboard")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, middleware_1.taskExist, middleware_1.authorizeAssignee, controllers_1.taskDashboard);
router
    .route("/:wsID/:taskID/editTaskAssignees")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, middleware_1.taskExist, middleware_1.getTaskDetails, controllers_1.editTaskAssigneesGet)
    .patch(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, middleware_1.taskExist, middleware_1.getTaskDetails, controllers_1.editTaskAssigneesPATCH);
router
    .route("/:wsID/:taskID/editTaskDetails")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, middleware_1.taskExist, middleware_1.getTaskDetails, controllers_1.editTaskDetailsGet)
    .patch(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, middleware_1.taskExist, middleware_1.getTaskDetails, controllers_1.editTaskDetailsPATCH);
router
    .route("/:wsID/:taskID/editTaskDetails")
    .delete(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeManager, middleware_1.taskExist, middleware_1.getTaskDetails, controllers_1.deleteTask);
//# sourceMappingURL=taskRouter.js.map