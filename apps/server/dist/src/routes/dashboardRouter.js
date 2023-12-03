"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.dashboardRouter = router;
router.route("/Home").get(middleware_1.requireAuth, controllers_1.dashboardGet);
router.route("/dashboard").get(middleware_1.requireAuth, controllers_1.dashboardGet);
router.route("/profile").get(middleware_1.requireAuth, controllers_1.profileGet);
router.route("/profile").patch(middleware_1.requireAuth, controllers_1.profilePATCH);
router.route("/profile").delete(middleware_1.requireAuth, controllers_1.profileDELETE);
router.route("/changePassword").post(middleware_1.requireAuth, controllers_1.changePassword);
//# sourceMappingURL=dashboardRouter.js.map