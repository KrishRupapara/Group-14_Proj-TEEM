import { request } from "@/utils/request";
import PeopleComponent from "../../components/PeopleComponent";

export default async function page({ params }: { params: { id: string } }) {
  const res = await request(`${params.id}/people`, "GET");

  return (
    <div className="h-[calc(100vh-8rem)] w-screen bg-gradient-to-b from-primaryblue to-white">
      <div className="flex flex-col items-center gap-3 pt-10">
        <PeopleComponent data={res} />
      </div>
    </div>
  );
}
