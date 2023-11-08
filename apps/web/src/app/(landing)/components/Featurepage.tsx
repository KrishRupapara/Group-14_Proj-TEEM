import Image from "next/image";

export default function Featurepage() {
  return (
    <div className="h-screen feature-bg">
      <div className="flex justify-between w-4/5 mx-auto p-20 h-1/3 items-center ">
        <div className="w-2/5 p-4">
          <Image
            src="/img/fea1.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
        <div className="w-3/5 p-5 m-4">
          <h1 className="text-white font-bold text-3xl my-5">
            Meet Efficiently
          </h1>
          <p>
            Say goodbye to the scheduling nightmare. TEEM provides a
            sophisticated scheduling tool that allows you to find the perfect
            meeting time for your team, no matter how scattered your schedules
            may be.
          </p>
        </div>
      </div>
      <div className="flex justify-between w-4/5 mx-auto p-16 h-1/3 items-center">
        <div className="w-3/5 pr-20 mx-4">
          <h1 className="text-white font-bold text-3xl my-5">
            Manage Workspace
          </h1>
          <p>
            With TEEM, create workspaces and add team members, stakeholders, and
            collaborators all in one place. Keep everyone on the same page and
            ensure seamless collaboration.
          </p>
        </div>
        <div className="w-2/5 p-5">
          <Image
            src="/img/fea2.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex justify-between w-4/5 mx-auto p-16 h-1/3 items-center">
        <div className="w-2/5 p-5">
          <Image
            src="/img/fea3.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
        <div className="w-3/5 p-5 m-4">
          <h1 className="text-white font-bold text-3xl my-5">
            Know what to do
          </h1>
          <p>
            TEEM&apos;s Dashboard offers a consolidated view of your workspaces;
            dive deeper into each workspace to monitor progress, Check off
            completed tasks, view upcoming milestones, Keep task deadlines in
            sight for effective workload management, and keep your projects on
            the path to success.
          </p>
        </div>
      </div>
    </div>
  );
}
