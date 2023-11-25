import supertest from "supertest";
import { app } from "../index";

// Mocking authentication middleware
jest.mock("../middleware/authMiddleware.ts", () => {
  return {
    requireAuth: jest.fn((req, res, next) => {
      req.user = { userID: 15, name: "mihir paija", isVerified: true };
      next();
    }),
  };
});

/*// Mocking workspace middleware
jest.mock("../middleware/wsMiddleware.ts", () => {
  return {
    wsExist: jest.fn((req, res, next) => {
      req.workspace = {
        workspaceID: 19,
        title: "test Workspace 2",
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
});*/

/*
describe("createWorkspacePost", () => {
  it("should return 400 if title is missing", async () => {
    const response = await supertest(app)
      .post("/api/createWorkspace")
      .send({})
      .expect(400);

    expect(response.body).toEqual({ error: "Title is required" });
  });

  it("should return 500 if an internal server error occurs", async () => {
    // Simulate an internal server error by providing only workspace title
    const workspaceData = {
      title: "Test Workspace",
    };

    const response = await supertest(app)
      .post("/api/createWorkspace")
      .send(workspaceData)
      .expect(500);

    expect(response.body).toEqual({
      message: "Internal server error in workspace",
    });
  });

  it("should return 201 with a success message if workspace is created successfully without details except titile", async () => {
    const workspaceData = {
      title: "Test Workspace",
      type: "",
      decription: "",
      Members: [],
    };

    const response = await supertest(app)
      .post("/api/createWorkspace")
      .send(workspaceData)
      .expect(201);

    expect(response.body).toEqual({
      message: "Workspace Created successfully",
    });
  });

  it("should return 201 with a message and details if workspace is created with unregistered members", async () => {
    const workspaceData = {
      title: "Test Workspace 1",
      type: "Test",
      description: "testing",
      Members: [{ member_id: "unregistered@example.com", Role: "TeamMate" }],
    };

    const response = await supertest(app)
      .post("/api/createWorkspace")
      .send(workspaceData)
      .expect(201);

    expect(response.body).toEqual({
      message: "Workspace Created with Unregistered Members",
      UnregisteredMember: ["unregistered@example.com"],
      RegisteredMember: [],
    });
  });

  it("should return 201 with a success message if workspace is created successfully", async () => {
    //every thing is perfect
    const workspaceData = {
      title: "Test Workspace 2",
      type: "Test",
      description: "testing",
      Members: [
        { member_id: "dummy1@gmail.com", Role: "TeamMate" },
        { member_id: "dummy4@gmail.com", Role: "collaborator" },
        { member_id: "dummy5@gmail.com", Role: "Client" },
      ],
    };

    const response = await supertest(app)
      .post("/api/createWorkspace")
      .send(workspaceData)
      .expect(201);

    expect(response.body).toEqual({
      message: "Workspace Created successfully",
    });
  });
});*/

describe("editWsDetailsGET", () => {
  it("should return 400 with if the workspace_id is not a number", async () => {
    const wsID = "workspace_id";
    const response = await supertest(app)
      .get(`/api/${wsID}/editWSDetails`)
      .expect(400);

    expect(response.body).toEqual({ Message: "Invalid wsID" });
  });

  it("should return 400 with if workspace_id is not passed", async () => {
    var wsID;
    const response = await supertest(app)
      .get(`/api/${wsID}/editWSDetails`)
      .expect(400);

    expect(response.body).toEqual({ Message: "Invalid wsID" });
  });

  it("should return 404 with if the workspace does not exist", async () => {
    const wsID = 987;
    const response = await supertest(app)
      .get(`/api/${wsID}/editWSDetails`)
      .expect(404);

    expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
  });

  it("should return 200 with a success message if workspace is edited successfully", async () => {
    //every thing is perfect
    const wsID = 19;
    const response = await supertest(app)
      .get(`/api/${wsID}/editWSDetails`)
      .expect(200);

    expect(response.body).toEqual({
      title: "test Workspace 2",
      type: "test",
      description: "testing",
    });
  });
});
