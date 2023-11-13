import { Router } from "express";

import {
  assignTaskGet,
  assignTaskPost,
  getTask,
  showAssignees,
  editTaskDetailsGet,
  editTaskDetailsPost,
  editTaskAssigneesGet,
  editTaskAssigneesPost
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
} from "../middleware";

const router: Router = Router();

router
  .route("/:wsID/assignTask")
  .get(requireAuth, wsExist, authorizeManager, assignTaskGet)
  .post(requireAuth, wsExist, authorizeManager, assignTaskPost);

router.route("/:wsID/:taskID/getTask")
  .get( requireAuth, wsExist,  authorizeMember,  taskExist, getTaskDetails, getTask);


router.route("/:wsID/:taskID/showAssignees")
  .get(requireAuth, wsExist, authorizeMember,  taskExist, getTaskDetails, showAssignees );

router.route("/:wsID/:taskID/editTaskDetails/:action")
    .get(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskDetailsGet)
    .post(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskDetailsPost);

router.route("/:wsID/:taskID/editTaskAssignees")
    .get(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskAssigneesGet)
    .post(requireAuth, wsExist, authorizeManager, taskExist, getTaskDetails, editTaskAssigneesPost);

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
