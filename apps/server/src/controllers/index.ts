import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
} from "./authController";

import { googleoauthHandler, oauthHanlder } from "./oAuthController";

import {
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,

  //settingsWSGet,
  //settingsWSPost,
  //addMembersPost,
  //addMembersGet,
} from "./workspaceController";

import {
  dashboardGet,
  profileGet,
  profileDELETE,
  profilePATCH,
} from "./dashboardController";

import { scheduleMeetHandler } from "./meetController";

import {
  assignTaskGet,
  assignTaskPost,
  getTask,
  //editTaskDetails,
  showAssignees,
  editTaskDetailsGet,
  editTaskDetailsPATCH,
  editTaskAssigneesGet,
  editTaskAssigneesPATCH,
  deleteTask,
  //settingsTaskGet,
  //settingTasksPost,
  //addTaskAssignees,
  //removeTaskAssignees,
} from "./taskController";

import {
  getPeople,
  getUpcoming,
  getYourWork,
  getStream,
  editWSDetailsGet,
  editWsDetailsPATCH,
  editWSMembersGet,
  editWSMembersPATCH,
  deleteWorkspaceDELETE,
} from "./wsDashboardcontroller";

import { showInvitees } from "./meetController";

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
  //addMembersGet,
  //addMembersPost,
  //settingsWSGet,
  //settingsWSPost,
  deleteWorkspaceDELETE,
  dashboardGet,
  assignTaskGet,
  assignTaskPost,
  getTask,
  showAssignees,
  //settingsTaskGet,
  //settingTasksPost,
  //editTaskDetails,
  //addTaskAssignees,
  //removeTaskAssignees,
  profileGet,
  scheduleMeetHandler,
  oauthHanlder,
  getPeople,
  getUpcoming,
  getYourWork,
  getStream,
  editWSDetailsGet,
  editWsDetailsPATCH,
  editWSMembersGet,
  editWSMembersPATCH,
  showInvitees,
  editTaskDetailsGet,
  editTaskDetailsPATCH,
  editTaskAssigneesGet,
  editTaskAssigneesPATCH,
  profilePATCH,
  profileDELETE,
  deleteTask
};
