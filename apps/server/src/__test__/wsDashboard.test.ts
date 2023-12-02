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

describe("people", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 46;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  it("should return 200 with if all good", async () => {
    const wsID = 19;
    const response = await supertest(app)
      .get(`/api/${wsID}/people`)
      .expect(200);

    expect(response.body).toEqual({
      People: {
        Manager: [
          {
            userID: 15,
            userName: "mihir paija",
            emailID: "mihirpaija21@gmail.com",
            role: "Manager",
          },
        ],
        Teammate: [
          {
            userID: 16,
            userName: "dummy 1",
            emailID: "dummy1@gmail.com",
            role: "TeamMate",
          },
        ],
        Collaborator: [
          {
            userID: 17,
            userName: "dummy 2",
            emailID: "dummy2@gmail.com",
            role: "collaborator",
          },
        ],
        Client: [
          {
            userID: 18,
            userName: "dummy 3",
            emailID: "dummy3@gmail.com",
            role: "Client",
          },
        ],
      },
    });
  });
});

describe("Your Work", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 46;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  describe("user is workspace manager", () => {
    it("should return 200 with if the workspace manager and filter is upcoming", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=Upcoming`)
        .expect(200);

      expect(response.body).toEqual({
        upcomingTask: [
          {
            taskID: 56,
            taskTitle: "dummy task 7",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 7",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is all", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=All`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 58,
            taskTitle: "dummy task 9",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 9",
          },
          {
            taskID: 57,
            taskTitle: "dummy task 8",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 8",
          },
          {
            taskID: 56,
            taskTitle: "dummy task 7",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 7",
          },
        ],
      });
    });
  });

  describe("user is workspace member", () => {
    it("should return 200 with if the workspace manager and filter is upcoming", async () => {
      const wsID = 31;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=Upcoming`)
        .expect(200);

      expect(response.body).toEqual({
        upcomingTask: [
          {
            taskID: 59,
            taskTitle: "dummy task 11",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 11",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is all", async () => {
      const wsID = 31;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=All`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 60,
            taskTitle: "dummy task 10",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 10",
          },
          {
            taskID: 59,
            taskTitle: "dummy task 11",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 11",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is not passed", async () => {
      const wsID = 31;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 60,
            taskTitle: "dummy task 10",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 10",
          },
          {
            taskID: 59,
            taskTitle: "dummy task 11",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 11",
          },
        ],
      });
    });
  });
});

describe("stream", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 46;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  describe("user is workspace manager", () => {
    it("should return 200 with if the workspace manager", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(200);

      expect(response.body).toEqual({
        Stream: [
          {
            objectID: 58,
            objectType: "Task",
            objectTitle: "dummy task 9",
            objectDescription: "abc 9",
            objectStatus: "To Do",
            created_at: "2023-11-29T18:38:58.150Z",
          },
          {
            objectID: 57,
            objectType: "Task",
            objectTitle: "dummy task 8",
            objectDescription: "abc 8",
            objectStatus: "To Do",
            created_at: "2023-11-29T18:38:49.428Z",
          },
          {
            objectID: 56,
            objectType: "Task",
            objectTitle: "dummy task 7",
            objectDescription: "abc 7",
            objectStatus: "To Do",
            created_at: "2023-11-29T18:38:30.999Z",
          },
        ],
      });
    });
  });

  describe("user is workspace member", () => {
    it("should return 200 with if the workspace member", async () => {
      const wsID = 31;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(200);

      expect(response.body).toEqual({
        Stream: [
          {
            objectID: 60,
            objectType: "Task",
            objectTitle: "dummy task 10",
            objectDescription: "abc 10",
            objectStatus: "To Do",
            created_at: "2023-11-29T18:44:14.415Z",
          },
          {
            objectID: 59,
            objectType: "Task",
            objectTitle: "dummy task 11",
            objectDescription: "abc 11",
            objectStatus: "To Do",
            created_at: "2023-11-29T18:44:05.305Z",
          },
        ],
      });
    });
  });
});
