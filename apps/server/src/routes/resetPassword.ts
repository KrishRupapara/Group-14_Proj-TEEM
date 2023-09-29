import { resetPasswordGet,resetPasswordPost} from "../controllers/resetPassword";
import express, { Router } from "express";



const router: Router = express.Router();


router.route("/resetPassword").post(resetPasswordPost).get(resetPasswordGet); 

export default router;