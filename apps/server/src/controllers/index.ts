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
import { assignTaskGet, assignTaskPost,   getTask,
  editTaskDetails,
  addTaskAssignees,
  removeTaskAssignees,
} from "./taskController";

export {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  googleoauthHandler,
  forgotPasswordPost,
  resetPasswordPost,
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
  getTask,
  editTaskDetails,
  addTaskAssignees,
  removeTaskAssignees,
  profileGet,
  scheduleMeetHandler,
};
