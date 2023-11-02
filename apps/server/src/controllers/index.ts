import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import {
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  addMembersPost,
  addMembersGet,
  deleteWorkspacePost,
} from "./workspaceController";

import { dashboardGet, profileGet } from "./dashboardController";

import { scheduleMeetHandler } from "./meetController";
import { assignTaskGet, assignTaskPost } from "./taskController";
import { getPeople,getUpcoming,getYourWork,getStream} from "./wsDashboardcontroller";

export {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  googleoauthHandler,
  forgotPasswordPost,
  resetPasswordPost,
  logoutHandler,
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  addMembersGet,
  addMembersPost,
  deleteWorkspacePost,
  dashboardGet,
  assignTaskGet,
  assignTaskPost,
  profileGet,
  scheduleMeetHandler,
  getPeople,
  getUpcoming,
  getYourWork,
  getStream,
};
