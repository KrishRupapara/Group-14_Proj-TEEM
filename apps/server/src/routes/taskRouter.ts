import { Router } from "express";

import {assignTaskGet , assignTaskPost, getTask, editTaskDetails, addTaskAssignees, removeTaskAssignees} from "../controllers"
import {requireAuth , authorizeManager, authorizeMember, getTaskDetails} from "../middleware"

const router : Router = Router();

router.route("/assignTask/:wsid")
    .get(requireAuth,authorizeManager,assignTaskGet)
    .post(requireAuth,authorizeManager,assignTaskPost);

router.route("/getTask/:wsid/:taskid")
    .get(requireAuth, authorizeMember, getTaskDetails, getTask);

router.route("/editTaskDetails/:wsid/:taskid")
    .post(requireAuth, authorizeManager, getTaskDetails, editTaskDetails);


router.route("/addTaskAssignees/:wsid/:taskid")
    .post(requireAuth, authorizeManager, getTaskDetails, addTaskAssignees);

router.route("/removeTaskAssignees/:wsid/:taskid")
    .post(requireAuth, authorizeManager, getTaskDetails, removeTaskAssignees);

export {router as taskRouter};