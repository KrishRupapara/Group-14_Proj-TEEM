import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import {
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  addMembersPost,
  addMembersGet,
  deleteWorkspaceGet,
} from "./workspaceController";

import { dashboardGet, profileGet } from "./dashboardController";

import { scheduleMeetHandler } from "./meetController";
import { assignTaskGet, assignTaskPost } from "./taskController";

export {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  googleoauthHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
  logoutHandler,
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  addMembersGet,
  addMembersPost,
  deleteWorkspaceGet,
  dashboardGet,
  assignTaskGet,
  assignTaskPost,
  profileGet,
  scheduleMeetHandler,
};
