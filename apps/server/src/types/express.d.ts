declare namespace Express {
  export interface Request {
    user: {
      userID: string;
      name: string;
      isVerified: boolean;
    };
  }
}
