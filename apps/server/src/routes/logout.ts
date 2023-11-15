import express, { Router } from "express";
import {logoutGet} from '../controllers/logout'
import {requireAuth} from '../middleware/loginMiddleware';

const router: Router = express.Router();

router.route('/logout').get(requireAuth, logoutGet);

export default router;



