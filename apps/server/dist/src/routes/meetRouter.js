"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const controllers_2 = require("../controllers");
const middleware_1 = require("../middleware");
const meetController_1 = require("../controllers/meetController");
const router = (0, express_1.Router)();
exports.meetRouter = router;
router
    .route("/:wsID/scheduleMeet")
    .post(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, controllers_1.scheduleMeetHandler);
router.route("/events").get(meetController_1.getCalendarEvents);
router.route("/deleteMeet/:meetID").get(middleware_1.requireAuth, controllers_2.deleteMeet);
router
    .route("/workspace/:wsID/meet/:meetID/dashboard")
    .get(middleware_1.requireAuth, middleware_1.wsExist, middleware_1.authorizeMember, middleware_1.meetExist, middleware_1.authorizeInvitee, controllers_1.meetDashboard);
router
    .route("/:wsID/:meetID/editMeetDetails")
    .patch(middleware_1.requireAuth, middleware_1.wsExist, controllers_2.editMeetDetails)
    .delete(middleware_1.requireAuth, middleware_1.wsExist, controllers_2.deleteMeet);
//# sourceMappingURL=meetRouter.js.map