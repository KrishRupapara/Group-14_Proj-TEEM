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

import { TEEMdashboardGet } from "./TEEMdashboardController";

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
  TEEMdashboardGet, 
  forgotPasswordPost,
  resetPasswordPost,
};
