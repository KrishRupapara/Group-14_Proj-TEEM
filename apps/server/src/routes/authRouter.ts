import { Router } from "express";
import {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  verifyUser,
  googleoauthHandler,
} from "../controllers";

const router: Router = Router();

router.route("/signup").get(signupGet).post(signupPost);

router.route("/login").post(loginPost).get(loginGet);

router.route("/verify").post(verifyUser);

router.route("/auth/oauth/google").get(googleoauthHandler);

export { router as authRouter };
