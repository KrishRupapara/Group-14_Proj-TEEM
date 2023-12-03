import type { SessionType } from "../model/Session";
import { CookieOptions } from "express";
export declare const accessTokenCookieOptions: CookieOptions;
export declare const refreshTokenCookieOptions: CookieOptions;
export declare const createSession: (id: string, refresh_token: string, userAgent: string, isVerified: boolean) => Promise<SessionType>;
export declare const findSessions: (userId: string) => Promise<string | null>;
export declare const getDecodedToken: (token: string) => Promise<any>;
export declare const deleteSession: (session_id: string) => Promise<void>;
