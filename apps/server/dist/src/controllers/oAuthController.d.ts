import { Request, Response } from "express";
export declare const googleoauthHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const oauthHanlder: (req: Request, res: Response) => void;
