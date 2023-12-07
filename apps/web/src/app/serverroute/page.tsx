import { cookies } from "next/headers";
export default async function page() {
  const serverCookies = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  const res = await fetch("http://localhost:3500/api/dashboard", {
    headers: {
      Authorization: `Bearer ${serverCookies?.value}`,
      cookie: `${refreshToken?.value}`,
    },
  }).then((res) => res.json());

  console.log(res);
  return <div>page</div>;
}
