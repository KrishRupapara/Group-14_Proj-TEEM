"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const authMiddleware_1 = require("./middleware/authMiddleware");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const redisConnect_1 = require("./config/redisConnect");
const morgan_1 = __importDefault(require("morgan"));
exports.app = (0, express_1.default)();
exports.app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
exports.app.set("trust proxy", 1);
exports.app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 5000,
}));
exports.app.use((0, helmet_1.default)());
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use("/api", routes_1.authRouter);
exports.app.use("/api", routes_1.workspaceRouter);
exports.app.use("/api", routes_1.dashboardRouter);
exports.app.use("/api", routes_1.taskRouter);
exports.app.use("/api", routes_1.meetRouter);
exports.app.get("/", (req, res) => {
    res.send("Hello world");
});
redisConnect_1.client.on("error", (err) => {
    throw new Error("Redis not connected!!");
});
exports.app.get("/smoothies", authMiddleware_1.requireAuth, (req, res) => {
    res.send("Only for logged in user");
});
const PORT = process.env.PORT || 3500;
const server = exports.app.listen(PORT, () => {
    console.log("Server listening on port " + PORT + "!");
});
module.exports = exports.app;
//# sourceMappingURL=index.js.map