import { Router } from "express";

import {assignTaskGet , assignTaskPost} from "../controllers"
import {requireAuth , authorizeManager} from "../middleware"

const router : Router = Router();

router.route("/assignTask/:wsID")
    .get(requireAuth,authorizeManager,assignTaskGet)
    .post(requireAuth,authorizeManager,assignTaskPost);

export {router as taskRouter};