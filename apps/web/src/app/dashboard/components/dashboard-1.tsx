import NavComponent from "@/components/Navbar";
import Progressbar from "@/components/ui/progress-bar";
import Link from "next/link";

export default function NewDashboard({ data }: { data: any }) {
  return (
    <div className="bg-gradient-to-b from-primaryblue to-white">
      <NavComponent />

      <div className="w-5/6 mx-auto h-full">
        {/* Task */}
        <div className="mt-24 w-full">
          <div className="xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 xl:h-3/4 mx-auto sm:h-full w-full gap-10 ">
            {data?.map((item: any) => (
              <Link
                href={`/workspace/${item.workspaceID}/stream`}
                key={item.workspaceID}
              >
                <WorkspaceContainer
                  title={item.title}
                  description={item.description}
                  progress={item.progress}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const WorkspaceContainer = ({
  title,
  description,
  progress,
}: {
  title: string;
  description: string;
  progress: string;
}) => {
  return (
    <div className="rounded-xl mt-5 flex justify-around items-center p-2 bg-white shadow-xl">
      <div className="w-1/2 break-words">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>
      <Progressbar percent={parseInt(progress)} />
    </div>
  );
};
