import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
} from "./authController";

import { googleoauthHandler, oauthHanlder } from "./oAuthController";

import {
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  settingsWSGet,
  settingsWSPost,
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
  settingsWSGet,
  settingsWSPost,
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
  oauthHanlder,
  getPeople,
  getUpcoming,
  getYourWork,
  getStream,

};
