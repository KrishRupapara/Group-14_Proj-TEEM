import Progressbar from "@/components/ui/progress-bar";

export type Workspace = {
  workspaceId: number;
  title: string;
  projectManager: string;
  progress: number;
  description: string;
  createdAt: string;
  type: string;
};

export default function StreamTitle({
  workspaceData,
}: {
  workspaceData: Workspace;
}) {
  return (
    <>
      <div className="col-start-1 grid gap-0 content-end p-2 whitespace-nowrap">
        <h1 className="text-2xl font-bold">{workspaceData.title}</h1>
        <p className="text-lg">{workspaceData.projectManager}</p>
      </div>
      <div className="col-end-6">
        <Progressbar percent={workspaceData.progress} />
      </div>
    </>
  );
}
