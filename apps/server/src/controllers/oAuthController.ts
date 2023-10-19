import { Request, Response } from "express";
import { getGoogleOAuthToken, getGoogleUser } from "../services/userServices";
import { db } from "../config/database";
import { users } from "../model/User";
import { signJWT } from "../utils/jwt";
import { createSession } from "../services/sessionServies";

export const googleoauthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleOAuthToken({ code });
    console.log({ id_token, access_token });

    const googleUser = await getGoogleUser({ id_token, access_token });

    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res
        .status(400)
        .send({ message: "Google account is not verified" });
    }

    const id = await db
      .insert(users)
      .values({ name: googleUser.name, emailId: googleUser.email })
      .returning({ id: users.userID });

    const session_id = id[0].id.toString();

    const accessToken = signJWT(
      { ...googleUser, session: session_id },
      { expiresIn: "24h" }
    );

    const refreshToken = signJWT(
      { ...googleUser, session: session_id },
      { expiresIn: "30d" }
    );

    const session = await createSession(
      session_id,
      refreshToken,
      req.get("user-agent") || ""
    );

    res.cookie("refreshToken", refreshToken);
    res.cookie("accessToken", accessToken);

    console.log(googleUser.email);
    res.redirect("http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
};
