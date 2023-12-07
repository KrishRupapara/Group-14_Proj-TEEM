import { cookies } from "next/headers";

export const request = async (url: string, method: string, body?: string) => {
  const requestCookies = cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${url}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${requestCookies.get("accessToken")?.value}`,
      cookie: `${requestCookies.get("refreshToken")?.value}`,
    },
    body: body,
  }).then((res) => res.json());

  return res;
};
