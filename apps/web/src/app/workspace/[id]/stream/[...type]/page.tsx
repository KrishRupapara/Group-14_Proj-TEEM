import { request } from "@/utils/request";
import TaskPage from "../../../components/taskPage";

export default async function page({
  params,
}: {
  params: { id: string; type: string[] };
}) {
  const type = params.type[1];

  const res = await request(
    `workspace/${params.id}/${type}/${params.type[0]}/dashboard`,
    "GET"
  );

  console.log(res);

  return (
    <TaskPage
      data={res}
      wsID={params.id}
      taskID={params.type[0]}
      type={params.type[1]}
    />
  );
}
