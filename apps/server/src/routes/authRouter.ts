import { Router } from "express";
import {
  signUpHandler,
  loginHandler,
  verifyUserHandler,
  googleoauthHandler,
  logoutHandler,
} from "../controllers";
import { requireAuth } from "../middleware";

const router: Router = Router();

router.route("/signup").post(signUpHandler);

router.route("/login").post(loginHandler);

router.route("/verify").post(verifyUserHandler);

router.route("/auth/oauth/google").get(googleoauthHandler);

router.route("/logout").get(requireAuth, logoutHandler);

export { router as authRouter };
