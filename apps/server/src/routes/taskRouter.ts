import { Router } from "express";

import {
  assignTaskGet,
  assignTaskPost,
  getTask,
  showAssignees,
  editTaskDetailsGet,
  editTaskDetailsPATCH,
  editTaskAssigneesGet,
  editTaskAssigneesPATCH,
  deleteTask,
  taskDashboard,
  //settingsTaskGet,
  //settingTasksPost,
  //editTaskDetails,
  //addTaskAssignees,
  //removeTaskAssignees,
} from "../controllers";
import {
  requireAuth,
  wsExist,
  authorizeManager,
  authorizeMember,
  taskExist,
  getTaskDetails,
  authorizeAssignee,
} from "../middleware";

const router: Router = Router();

router
  .route("/:wsID/assignTask")
  .get(requireAuth, wsExist, authorizeManager, assignTaskGet)
  .post(requireAuth, wsExist, authorizeManager, assignTaskPost);

router.route("/:wsID/:taskID/getTask")
  .get( requireAuth, wsExist,  authorizeMember,  taskExist, getTaskDetails, getTask);

router.route("/:wsID/:taskID/taskDashboard")
  .get(requireAuth, wsExist, authorizeMember,  taskExist, authorizeAssignee, taskDashboard );
  
router.route("/:wsID/:taskID/showAssignees")
  .get(requireAuth, wsExist, authorizeMember,  taskExist, getTaskDetails, showAssignees );

router.route("/:wsID/:taskID/editTaskDetails")
    .get(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskDetailsGet)
    .patch(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskDetailsPATCH);

router.route("/:wsID/:taskID/editTaskAssignees")
    .get(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskAssigneesGet)
    .patch(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskAssigneesPATCH);

    router.route("/:wsID/:taskID/editTaskDetails")
    // .get(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskAssigneesGet)
    .delete(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, deleteTask);
  /*
router.route("/:wsID/:taskID/settingsTask/:toDo")
  .get(requireAuth, wsExist, authorizeManager, getTaskDetails, settingsTaskGet)
  .post(requireAuth,wsExist, authorizeManager, getTaskDetails, settingTasksPost
  );

router.route("/:wsID/:taskid/editTaskDetails")
  .get(requireAuth, wsExist, authorizeManager, taskExist)
  .post(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskDetails );

router.route("/:wsID/:taskID/editTaskAssignees").post();

router.route(":wsID/:taskid/addTaskAssignees/")
  .post( requireAuth, wsExist, authorizeManager,getTaskDetails, addTaskAssignees );

router.route("/:wsID/:taskid/removeTaskAssignees")
  .post(requireAuth, wsExist, authorizeManager, getTaskDetails, removeTaskAssignees );
*/

export { router as taskRouter };
