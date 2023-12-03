import jwt from "jsonwebtoken";
export declare const signJWT: (object: Object, options?: jwt.SignOptions | undefined) => string;
export declare const verifyJWT: (token: string) => {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
} | {
    valid: boolean;
    expired: boolean;
    decoded: null;
};
