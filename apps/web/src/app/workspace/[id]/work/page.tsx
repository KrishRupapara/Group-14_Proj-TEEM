import { request } from "@/utils/request";
import WorkComponent from "../../components/WorkComponent";

export default async function page({ params }: { params: { id: string } }) {
  const res = await request(`${params.id}/yourWork`, "GET");

  return <WorkComponent wsID={params.id} type="Work" tasks={res} />;
}
