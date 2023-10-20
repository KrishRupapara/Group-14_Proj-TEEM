import {
  signUpHandler,
  verifyUserHandler,
  loginHandler,
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
};
