import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
  forgotPasswordPost,
  resetPasswordPost,
  
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import { createWorkspaceGet, createWorkspacePost, getWorkspace , addMembersPost, deleteWorkspacePost } from "./workspaceController";

import { TEEMdashboardGet } from "./TEEMdashboardController";

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
  addMembersPost,
  deleteWorkspacePost,
  TEEMdashboardGet, 
  
};
