import supertest from "supertest";
import { app } from "../index";

jest.mock("../middleware/authMiddleware.ts", () => {
  return {
    requireAuth: jest.fn((req, res, next) => {
      req.user = { userID: 15, name: "mihir paija", isVerified: true };
      next();
    }),
  };
});

// Mocking wsExist middleware
jest.mock("../middleware/wsMiddleware.ts", () => {
  return {
    wsExist: jest.fn((req, res, next) => {
      req.workspace = {
        workspaceID: 1,
        title: "Test Workspace",
        projectManager: 15,
      };
      next();
    }),

    authorizeManager: jest.fn((req, res, next) => {
      if (req.user.userID === req.workspace.projectManager) next();
    }),

    authorizeMember: jest.fn((req, res, next) => {
      next();
    }),
  };
});

