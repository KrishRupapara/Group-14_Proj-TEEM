import { request } from "@/utils/request";
import StreamPage from "../../components/streamPage";
import StreamTitle from "../../components/streamPageTitle";

export default async function page({ params }: { params: { id: string } }) {
  const res = await request(`${params.id}/stream`, "GET");

  // console.log(res);

  return (
    <div className="Projectbg h-[calc(100vh-5.1rem)]">
      <div className="w-fit lg:w-4/5 md:w-4/5 sm:w-4/5 mx-auto p-10">
        <div className="border rounded-2xl bg-white flex flex-col lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-row gap-4 justify-between px-5">
          <StreamTitle workspaceData={res.Workspace} />
        </div>
        <StreamPage
          streamData={res.Stream}
          workspaceId={params.id}
          manager={res.Workspace.projectManager}
        />
      </div>
    </div>
  );
}
