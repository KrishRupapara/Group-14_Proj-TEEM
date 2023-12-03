import { Request, Response } from "express";
export declare const scheduleMeetHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCalendarEvents: (req: Request, res: Response) => Promise<void>;
export declare const deleteMeet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const showInvitees: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editMeetDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
