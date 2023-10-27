import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import { createWorkspaceGet, createWorkspacePost,addMembersPost, addMembersGet, deleteWorkspacePost } from "./workspaceController";

import { dashboardGet } from "./dashboardController";

import {
  assignTaskGet,
  assignTaskPost,
} from "./taskController"

export { 
  signUpHandler, 
  verifyUserHandler, 
  loginHandler, 
  googleoauthHandler,
  logoutHandler,
  createWorkspaceGet,
  createWorkspacePost,
  deleteWorkspacePost,
  addMembersPost,
  addMembersGet,
  dashboardGet, 
  forgotPasswordPost,
  resetPasswordPost,
  assignTaskGet,
  assignTaskPost,
};
