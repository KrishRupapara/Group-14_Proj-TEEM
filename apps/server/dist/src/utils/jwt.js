"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signJWT = (object, options) => {
    return jsonwebtoken_1.default.sign(object, process.env.JWT_SECRET, Object.assign({}, (options && options)));
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (err) {
        console.error(err);
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decoded: null,
        };
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.js.map