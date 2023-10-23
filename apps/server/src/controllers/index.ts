import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  forgotPasswordPost,
  resetPasswordPost,
  
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import { createWorkspaceGet, createWorkspacePost } from "./workspaceController";

import { TEEMdashboardGet } from "./TEEMdashboardController";

export { 
  signUpHandler, 
  verifyUserHandler, 
  loginHandler, 
  googleoauthHandler,
  createWorkspaceGet,
  createWorkspacePost,
  TEEMdashboardGet, 
  forgotPasswordPost,
  resetPasswordPost,
};
