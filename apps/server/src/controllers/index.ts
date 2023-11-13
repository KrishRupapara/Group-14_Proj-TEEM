import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
  deleteUser,
  changepassword,
} from "./authController";

import { googleoauthHandler, oauthHanlder } from "./oAuthController";

import {
  createWorkspaceGet,
  createWorkspacePost,
  getWorkspace,
  addMembersPost,
  addMembersGet,
  deleteWorkspaceGet,
} from "./workspaceController";

import { dashboardGet, profileGet } from "./dashboardController";

import { scheduleMeetHandler , deleteMeet} from "./meetController";

import { assignTaskGet, assignTaskPost,   getTask,
  editTaskDetails,
  addTaskAssignees,
  removeTaskAssignees,
  deleteTask,

} from "./taskController";

import { getPeople,getUpcoming,getYourWork,getStream} from "./wsDashboardcontroller";


export {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  googleoauthHandler,
  forgotPasswordPost,
  resetPasswordPost,
  resendOtp,
  deleteUser,
  changepassword,
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
  getTask,
  deleteTask,
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
  deleteMeet,

};
