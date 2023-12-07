import Tasks from "./tasks";

export type stream = {
  objectID: number;
  objectStatus: string;
  objectTitle: string;
  objectType: string;
  objectDescription: string;
  created_at: string;
  meetDate?: string;
  TaskDeadline?: string;
};

export default function StreamPage({
  streamData,
  workspaceId,
  manager,
}: {
  streamData: Array<stream>;
  workspaceId: string;
  manager: string;
}) {
  if (streamData.length === 0)
    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-2xl font-bold">No Tasks</h1>
        <p className="text-lg text-gray-500">
          Create a task or a meet to see it here
        </p>
      </div>
    );

  return (
    <>
      {streamData?.map((item, id) => (
        <Tasks
          key={id}
          id={item.objectID}
          type={item.objectType}
          workspaceId={workspaceId}
          title={item.objectTitle}
          date={item.meetDate || item.TaskDeadline}
          status={item.objectStatus}
        />
      ))}
    </>
  );
}
