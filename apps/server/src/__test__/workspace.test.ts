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
/*
describe("editWsDetailsGET", () => {
  describe("invlaid request body", () => {
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
  });

  describe("unauthorized manager", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You do not own the workspace",
      });
    });
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
});*/
/*
describe("editWsDetailsPATCH", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized manager", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You do not own the workspace",
      });
    });
  });

  describe("invalid request body", () => {
    it("should return 400 with a success message if req body is empty", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send({})
        .expect(400);

      expect(response.body).toEqual({
        error: "Title, description, and type are required",
      });
    });

    it("should return 400 with a success message if title is empty", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send({
          title: null,
          type: null,
          description: null,
        })
        .expect(400);

      expect(response.body).toEqual({ error: "Title can not be empty" });
    });

    it("should return 400 with a success message if type is empty", async () => {
      //every thing is perfect
      const wsID = 19;
      const workspaceData = {
        title: "dummy Workspace 2",
        type: null,
        description: "testing",
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send(workspaceData)
        .expect(400);

      expect(response.body).toEqual({ error: "Type can not be empty" });
    });
  });

  describe("valid request body", () => {
    it("should return 200 with a success message if workspace is edited successfully with null description", async () => {
      //every thing is perfect
      const wsID = 19;
      const workspaceData = {
        title: "dummy Workspace 2",
        type: "dummy",
        description: null,
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send(workspaceData)
        .expect(200);

      expect(response.body).toEqual({ message: "Settings Saved" });
    });

    it("should return 200 with a success message if workspace is edited successfully with null description", async () => {
      //every thing is perfect
      const wsID = 19;
      const workspaceData = {
        title: "dummy Workspace 2",
        type: "dummy",
        description: "testing",
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send(workspaceData)
        .expect(200);

      expect(response.body).toEqual({ message: "Settings Saved" });
    });

    it("should return 200 with a success message if workspace is edited successfully", async () => {
      //every thing is perfect
      const wsID = 19;
      const workspaceData = {
        title: "dummy Workspace 2",
        type: "dummy",
        description: "testing",
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSDetails`)
        .send(workspaceData)
        .expect(200);

      expect(response.body).toEqual({ message: "Settings Saved" });
    });
  });
});*/

/*
describe("editWsMembersGET", () => {
  describe("invalid request body", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/editWSMembers`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/editWSMembers`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/editWSMembers`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized manager", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You do not own the workspace",
      });
    });
  });

  it("should return 200 with a success message if workspace is edited successfully", async () => {
    //every thing is perfect
    const wsID = 19;
    const response = await supertest(app)
      .get(`/api/${wsID}/editWSMembers`)
      .expect(200);

    expect(response.body).toEqual({
        "Members": [
            {
                "Name": "mihir paija",
                "Role": "Manager"
            },
            {
                "Name": "dummy 1",
                "Role": "TeamMate"
            },
            {
                "Name": "dummy 4",
                "Role": "collaborator"
            },
            {
                "Name": "dummy 5",
                "Role": "Client"
            }
        ]
    });
  });
});*/

describe("editWsMembersPATCH", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized manager", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You do not own the workspace",
      });
    });
  });

  //   describe("invalid request body", () => {
  //     it("should return 400 with a success message if req body is empty", async () => {
  //       const wsID = 19;
  //       const response = await supertest(app)
  //         .patch(`/api/${wsID}/editWSMembers`)
  //         .send({})
  //         .expect(400);

  //       expect(response.body).toEqual({
  //         error: "Title, description, and type are required",
  //       });
  //     });

  //     it("should return 400 with a success message if title is empty", async () => {
  //       const wsID = 19;
  //       const response = await supertest(app)
  //         .patch(`/api/${wsID}/editWSMembers`)
  //         .send({
  //           title: null,
  //           type: null,
  //           description: null,
  //         })
  //         .expect(400);

  //       expect(response.body).toEqual({ error: "Title can not be empty" });
  //     });

  //     it("should return 400 with a success message if type is empty", async () => {
  //       //every thing is perfect
  //       const wsID = 19;
  //       const workspaceData = {
  //         title: "dummy Workspace 2",
  //         type: null,
  //         description: "testing",
  //       };

  //       const response = await supertest(app)
  //         .patch(`/api/${wsID}/editWSMembers`)
  //         .send(workspaceData)
  //         .expect(400);

  //       expect(response.body).toEqual({ error: "Type can not be empty" });
  //     });
  //   });

  describe("valid request body", () => {
    it("should return 201 with a success message if new member is unregister", async () => {
      //every thing is perfect
      const wsID = 19;
      const MemberData = {
        Members: [
          {
            member_id: "dummy1@gmail.com",
            Role: "TeamMate",
          },
          {
            member_id: "dummy4@gmail.com",
            Role: "collaborator",
          },
          {
            member_id: "dummy5@gmail.com",
            Role: "Client",
          },
          {
            member_id: "unregister@gmail.com",
            Role: "Client",
          },
        ],
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .send(MemberData)
        .expect(201);

      expect(response.body).toEqual({
        message: " Settings Saved With Unregistered Members Invited",
        unregisteredMembers: ["unregister@gmail.com"],
      });
    });

    it("should return 200 with a success message if workspace member removed", async () => {
      //every thing is perfect
      const wsID = 19;
      const MemberData = {
        Members: [
          {
            member_id: "dummy1@gmail.com",
            Role: "TeamMate",
          },
          {
            member_id: "dummy4@gmail.com",
            Role: "collaborator",
          },
        ],
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .send(MemberData)
        .expect(200);

      expect(response.body).toEqual({ message: "Settings Saved" });
    });

    it("should return 200 with a success message if workspace member added", async () => {
      //every thing is perfect
      const wsID = 19;
      const MemberData = {
        Members: [
          {
            member_id: "dummy1@gmail.com",
            Role: "TeamMate",
          },
          {
            member_id: "dummy4@gmail.com",
            Role: "collaborator",
          },
          {
            member_id: "dummy5@gmail.com",
            Role: "Client",
          },
        ],
      };

      const response = await supertest(app)
        .patch(`/api/${wsID}/editWSMembers`)
        .send(MemberData)
        .expect(200);

      expect(response.body).toEqual({ message: "Settings Saved" });
    });
  });
});

describe("editWsWSDetailsDELETE", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .delete(`/api/${wsID}/editWSDetails`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .delete(`/api/${wsID}/editWSDetails`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .delete(`/api/${wsID}/editWSDetails`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized manager", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .delete(`/api/${wsID}/editWSDetails`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You do not own the workspace",
      });
    });
  });

  it("should return 200 with if the workspace deleted", async () => {
    const wsID = 22;
    const response = await supertest(app)
      .delete(`/api/${wsID}/editWSDetails`)
      .expect(200);

    expect(response.body).toEqual({
      Message: "Workspace deleted successfully",
    });
  });
});
