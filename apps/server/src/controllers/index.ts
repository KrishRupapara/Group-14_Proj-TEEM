import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
  changePassword,
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

import { scheduleMeetHandler, deleteMeet } from "./meetController";

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

import { taskDashboard } from "./taskDashboard";
import { meetDashboard } from "./meetDashboard";

import {
  getPeople,
  getYourMeet,
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
  changePassword,
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
  getYourWork,
  getYourMeet,
  getStream,
  deleteMeet,
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
  deleteTask,
  taskDashboard,
  meetDashboard
};
