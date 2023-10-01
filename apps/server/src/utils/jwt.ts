import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signJWT = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, process.env.JWT_SECRET!, {
    ...(options && options),
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    console.error(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
};
