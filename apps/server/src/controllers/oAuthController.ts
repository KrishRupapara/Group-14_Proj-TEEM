import { Request, Response } from "express";
import { getGoogleOAuthToken, getGoogleUser } from "../services/userServices";
import { db } from "../config/database";
import { users } from "../model/User";
import { signJWT } from "../utils/jwt";
import { createSession } from "../services/sessionServies";
import { client as redisClient } from "../config/redisConnect";
import { getGoogleUrl } from "../utils/googleUrl";

export const googleoauthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  console.log(req.query);

  try {
    const { id_token, access_token, refresh_token } = await getGoogleOAuthToken(
      { code }
    );
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
      .values({
        name: googleUser.name,
        emailId: googleUser.email,
        isVerified: true,
      })
      .returning({ id: users.userID });

    const session_id = id[0].id.toString();

    redisClient.hset(session_id + "_google_token", {
      access_token,
      refresh_token,
    });

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
      req.get("user-agent") || "",
      true,
      req.ip
    );

    res.cookie("refreshToken", refreshToken);
    res.cookie("accessToken", accessToken);

    console.log(googleUser.email);
    res.redirect("http://localhost:3000/dashboard");
  } catch (err) {
    console.log(err);
  }
};

export const oauthHanlder = (req: Request, res: Response) => {
  const googleUrl = getGoogleUrl();

  res.redirect(googleUrl);
};
