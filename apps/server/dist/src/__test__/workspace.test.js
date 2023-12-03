"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
jest.mock("../middleware/authMiddleware.ts", () => {
    return {
        requireAuth: jest.fn((req, res, next) => {
            req.user = { userID: 15, name: "mihir paija", isVerified: true };
            next();
        }),
    };
});
describe("createWorkspacePost", () => {
    it("should return 400 if title is missing", async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post("/api/createWorkspace")
            .send({})
            .expect(400);
        expect(response.body).toEqual({ error: "Title is required" });
    });
    it("should return 500 if an internal server error occurs", async () => {
        const workspaceData = {
            title: "Test Workspace",
        };
        const response = await (0, supertest_1.default)(index_1.app)
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
        const response = await (0, supertest_1.default)(index_1.app)
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
        const response = await (0, supertest_1.default)(index_1.app)
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
        const workspaceData = {
            title: "Test Workspace 2",
            type: "Test",
            description: "testing",
            Members: [
                { member_id: "dummy1@gmail.com", Role: "TeamMate" },
                { member_id: "dummy2@gmail.com", Role: "collaborator" },
                { member_id: "dummy3@gmail.com", Role: "Client" },
            ],
        };
        const response = await (0, supertest_1.default)(index_1.app)
            .post("/api/createWorkspace")
            .send(workspaceData)
            .expect(201);
        expect(response.body).toEqual({
            message: "Workspace Created successfully",
        });
    });
});
describe("editWsDetailsGET", () => {
    describe("invlaid request body", () => {
        it("should return 400 with if the workspace_id is not a number", async () => {
            const wsID = "workspace_id";
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 400 with if workspace_id is not passed", async () => {
            var wsID;
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 404 with if the workspace does not exist", async () => {
            const wsID = 987;
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSDetails`)
                .expect(404);
            expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
        });
    });
    describe("unauthorized manager", () => {
        it("should return 401 with if the user do not own workspace", async () => {
            const wsID = 31;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .expect(401);
            expect(response.body).toEqual({
                Message: "You do not own the workspace",
            });
        });
    });
    it("should return 200 with a success message if workspace is edited successfully", async () => {
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/editWSDetails`)
            .expect(200);
        expect(response.body).toEqual({
            title: "dummy Workspace 2",
            description: "testing",
            type: "dummy",
        });
    });
});
describe("editWsDetailsPATCH", () => {
    describe("invalid workspace ID", () => {
        it("should return 400 with if the workspace_id is not a number", async () => {
            const wsID = "workspace_id";
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 400 with if workspace_id is not passed", async () => {
            var wsID;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 404 with if the workspace does not exist", async () => {
            const wsID = 987;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .expect(404);
            expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
        });
    });
    describe("unauthorized manager", () => {
        it("should return 401 with if the user do not own workspace", async () => {
            const wsID = 31;
            const response = await (0, supertest_1.default)(index_1.app)
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
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .send({})
                .expect(400);
            expect(response.body).toEqual({
                error: "Title, description, and type are required",
            });
        });
        it("should return 400 with a success message if title is empty", async () => {
            const wsID = 19;
            const response = await (0, supertest_1.default)(index_1.app)
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
            const wsID = 19;
            const workspaceData = {
                title: "dummy Workspace 2",
                type: null,
                description: "testing",
            };
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .send(workspaceData)
                .expect(400);
            expect(response.body).toEqual({ error: "Type can not be empty" });
        });
    });
    describe("valid request body", () => {
        it("should return 200 with a success message if workspace is edited successfully with null description", async () => {
            const wsID = 19;
            const workspaceData = {
                title: "dummy Workspace 2",
                type: "dummy",
                description: null,
            };
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .send(workspaceData)
                .expect(200);
            expect(response.body).toEqual({ message: "Settings Saved" });
        });
        it("should return 200 with a success message if workspace is edited successfully", async () => {
            const wsID = 19;
            const workspaceData = {
                title: "dummy Workspace 2",
                type: "dummy",
                description: "testing",
            };
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSDetails`)
                .send(workspaceData)
                .expect(200);
            expect(response.body).toEqual({ message: "Settings Saved" });
        });
    });
});
describe("editWsMembersGET", () => {
    describe("invalid request body", () => {
        it("should return 400 with if the workspace_id is not a number", async () => {
            const wsID = "workspace_id";
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSMembers`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 400 with if workspace_id is not passed", async () => {
            var wsID;
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSMembers`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 404 with if the workspace does not exist", async () => {
            const wsID = 987;
            const response = await (0, supertest_1.default)(index_1.app)
                .get(`/api/${wsID}/editWSMembers`)
                .expect(404);
            expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
        });
    });
    describe("unauthorized manager", () => {
        it("should return 401 with if user do not own workspace", async () => {
            const wsID = 31;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .expect(401);
            expect(response.body).toEqual({
                Message: "You do not own the workspace",
            });
        });
    });
    it("should return 200 with a success message if workspace is edited successfully", async () => {
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/editWSMembers`)
            .expect(200);
        expect(response.body).toEqual({
            Members: [
                {
                    Name: "mihir paija",
                    Role: "Manager",
                },
                {
                    Name: "dummy 1",
                    Role: "TeamMate",
                },
                {
                    Name: "dummy 2",
                    Role: "collaborator",
                },
                {
                    Name: "dummy 3",
                    Role: "Client",
                },
            ],
        });
    });
});
describe("editWsMembersPATCH", () => {
    describe("invalid workspace ID", () => {
        it("should return 400 with if the workspace_id is not a number", async () => {
            const wsID = "workspace_id";
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 400 with if workspace_id is not passed", async () => {
            var wsID;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 404 with if the workspace does not exist", async () => {
            const wsID = 987;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .expect(404);
            expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
        });
    });
    describe("unauthorized manager", () => {
        it("should return 401 with if user do not own workspace", async () => {
            const wsID = 31;
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .expect(401);
            expect(response.body).toEqual({
                Message: "You do not own the workspace",
            });
        });
    });
    describe("valid request body", () => {
        it("should return 201 with a success message if new member is unregister", async () => {
            const wsID = 19;
            const MemberData = {
                Members: [
                    {
                        member_id: "dummy1@gmail.com",
                        Role: "TeamMate",
                    },
                    {
                        member_id: "dummy2@gmail.com",
                        Role: "collaborator",
                    },
                    {
                        member_id: "dummy3@gmail.com",
                        Role: "Client",
                    },
                    {
                        member_id: "unregister@gmail.com",
                        Role: "Client",
                    },
                ],
            };
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .send(MemberData)
                .expect(201);
            expect(response.body).toEqual({
                message: " Settings Saved With Unregistered Members Invited",
                unregisteredMembers: ["unregister@gmail.com"],
            });
        });
        it("should return 200 with a success message if workspace member removed", async () => {
            const wsID = 19;
            const MemberData = {
                Members: [
                    {
                        member_id: "dummy1@gmail.com",
                        Role: "TeamMate",
                    },
                    {
                        member_id: "dummy2@gmail.com",
                        Role: "collaborator",
                    },
                ],
            };
            const response = await (0, supertest_1.default)(index_1.app)
                .patch(`/api/${wsID}/editWSMembers`)
                .send(MemberData)
                .expect(200);
            expect(response.body).toEqual({ message: "Settings Saved" });
        });
        it("should return 200 with a success message if workspace member added", async () => {
            const wsID = 19;
            const MemberData = {
                Members: [
                    {
                        member_id: "dummy1@gmail.com",
                        Role: "TeamMate",
                    },
                    {
                        member_id: "dummy2@gmail.com",
                        Role: "collaborator",
                    },
                    {
                        member_id: "dummy3@gmail.com",
                        Role: "Client",
                    },
                ],
            };
            const response = await (0, supertest_1.default)(index_1.app)
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
            const response = await (0, supertest_1.default)(index_1.app)
                .delete(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 400 with if workspace_id is not passed", async () => {
            var wsID;
            const response = await (0, supertest_1.default)(index_1.app)
                .delete(`/api/${wsID}/editWSDetails`)
                .expect(400);
            expect(response.body).toEqual({ Message: "Invalid wsID" });
        });
        it("should return 404 with if the workspace does not exist", async () => {
            const wsID = 987;
            const response = await (0, supertest_1.default)(index_1.app)
                .delete(`/api/${wsID}/editWSDetails`)
                .expect(404);
            expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
        });
    });
    describe("unauthorized manager", () => {
        it("should return 401 with if user do not own workspace", async () => {
            const wsID = 31;
            const response = await (0, supertest_1.default)(index_1.app)
                .delete(`/api/${wsID}/editWSDetails`)
                .expect(401);
            expect(response.body).toEqual({
                Message: "You do not own the workspace",
            });
        });
    });
    it("should return 200 with if the workspace deleted", async () => {
        const wsID = 41;
        const response = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/${wsID}/editWSDetails`)
            .expect(200);
        expect(response.body).toEqual({
            Message: "Workspace deleted successfully",
        });
    });
});
//# sourceMappingURL=workspace.test.js.map