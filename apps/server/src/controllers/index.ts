import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
  logoutHandler,
} from "./authController";

import { googleoauthHandler } from "./oAuthController";

import { createWorkspaceGet, createWorkspacePost } from "./workspaceController";

import { TEEMdashboardGet } from "./TEEMdashboardController";

export { 
  signUpHandler, 
  verifyUserHandler, 
  loginHandler, 
  googleoauthHandler,
  logoutHandler,
  createWorkspaceGet,
  createWorkspacePost,
  TEEMdashboardGet, 
};
