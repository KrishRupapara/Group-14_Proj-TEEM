import { cookies } from "next/headers";
import NewDashboard from "./components/dashboard-1";

export default async function page() {
  const cookie = cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.get("accessToken")?.value}`,
      cookie: `${cookie.get("refreshToken")?.value}`,
    },
  }).then((res) => res.json());

  if (res.message === "Please verify your email") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1>Please verify your email</h1>
      </div>
    );
  }

  return (
    <div className="bg-dash">
      <NewDashboard data={res} />
    </div>
  );
}
