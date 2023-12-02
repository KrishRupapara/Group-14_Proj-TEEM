import TaskPage from "../../../components/taskPage";

export default function TaskDetails({
  params,
}: {
  params: { id: string; type: string[] };
}) {
  console.log(params.type[0]);
  return (
    <TaskPage wsID={params.id} taskID={params.type[0]} type={params.type[1]} />
  );
}
