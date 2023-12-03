import { Router } from "express";
import {
  signUpHandler,
  loginHandler,
  verifyUserHandler,
  googleoauthHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
  oauthHanlder,
  changePassword,
  checkAuth,
} from "../controllers";
import { requireAuth } from "../middleware";

const router: Router = Router();

router.route("/signup").post(signUpHandler);

router.route("/login").post(loginHandler);

router.route("/verify").post(verifyUserHandler);

router.route("/auth/oauth/google").get(googleoauthHandler);
router.route("/googleurl").get(oauthHanlder);

router.route("/logout").get(requireAuth, logoutHandler);
router.route("/forgotPassword").post(forgotPasswordPost);

router.route("/resetPassword").post(resetPasswordPost);
router.route("/resendOtp").post(resendOtp);
router.route("/changePassword").post(requireAuth, changePassword);

router.route("/auth/check").get(requireAuth, checkAuth);

export { router as authRouter };
