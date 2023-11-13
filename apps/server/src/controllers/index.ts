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
  editWSDetailsGet,
  editWsDetailsPost,
  editWSMembersGet,
  editWSMembersPost,
  //settingsWSGet,
  //settingsWSPost,
  //addMembersPost,
  //addMembersGet,
  deleteWorkspacePost,
} from "./workspaceController";

import { dashboardGet, profileGet, profileDELETE,profilePATCH } from "./dashboardController";

import { scheduleMeetHandler } from "./meetController";

import { assignTaskGet, assignTaskPost,   getTask,
  //editTaskDetails,
  showAssignees,
  editTaskDetailsGet,
  editTaskDetailsPost,
  editTaskAssigneesGet,
  editTaskAssigneesPost,
  //settingsTaskGet,
  //settingTasksPost,
  //addTaskAssignees,
  //removeTaskAssignees,
} from "./taskController";

import { getPeople,getUpcoming,getYourWork,getStream} from "./wsDashboardcontroller";

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
  deleteWorkspacePost,
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
  editWsDetailsPost,
  editWSMembersGet,
  editWSMembersPost,
  showInvitees,
  editTaskDetailsGet,
  editTaskDetailsPost, 
  editTaskAssigneesGet,
  editTaskAssigneesPost,
   profilePATCH,
  profileDELETE
};
