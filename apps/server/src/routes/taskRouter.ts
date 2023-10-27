import { Router } from "express";

import {assignTaskGet , assignTaskPost} from "../controllers"
import {requireAuth} from "../middleware"

const router : Router = Router();

router.route("/assignTask/:wsID")
    .get(requireAuth,assignTaskGet)
    .post(requireAuth,assignTaskPost);

export {router as taskRouter};