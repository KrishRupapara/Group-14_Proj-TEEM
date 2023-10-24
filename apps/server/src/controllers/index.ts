import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  forgotPasswordPost,
  resetPasswordPost,
  
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import { createWorkspaceGet, createWorkspacePost , deleteWorkspacePost } from "./workspaceController";

import { TEEMdashboardGet } from "./TEEMdashboardController";

export { 
  signUpHandler, 
  verifyUserHandler, 
  loginHandler, 
  googleoauthHandler,
  createWorkspaceGet,
  createWorkspacePost,
  deleteWorkspacePost,
  TEEMdashboardGet, 
  forgotPasswordPost,
  resetPasswordPost,
};
