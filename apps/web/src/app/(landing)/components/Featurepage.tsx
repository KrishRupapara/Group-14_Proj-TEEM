import Image from "next/image";

export default function Featurepage() {
  return (
    <div className="h-screen feature-bg">

      <div className="xl:flex xl:flex-row sm:flex sm:flex-col justify-between xl:w-4/5 sm:w-full mx-auto xl:p-20 xl:h-1/3 items-center sm:h-full">
        <div className="xl:w-2/5 sm:w-full p-5">
          <Image
            src="/img/fea1.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
        <div className="xl:w-3/5 sm:w-full p-5 xl:m-4 sm:m-1">
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
      <div className="xl:flex sm:revprop sm:flex xl:flex-row sm:flex-col-reverse justify-between xl:w-4/5 sm:w-full mx-auto xl:p-16 xl:h-1/3 sm:h-full items-center">
        <div className="xl:w-3/5 sm:w-full xl:pr-20 xl:mx-4 sm:m-1 p-5">
          <h1 className="text-white font-bold text-3xl my-5">
            Manage Workspace
          </h1>
          <p>
            With TEEM, create workspaces and add team members, stakeholders, and
            collaborators all in one place. Keep everyone on the same page and
            ensure seamless collaboration.
          </p>
        </div>
        <div className="xl:w-2/5 sm:w-full p-5">
          <Image
            src="/img/fea2.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="xl:flex sm:flex xl:flex-row sm:flex-col justify-between xl:w-4/5 sm:w-full mx-auto xl:p-16 xl:h-1/3 sm:h-full items-center">
        <div className="xl:w-2/5 sm:w-full p-5 sm:p-8">
          <Image
            src="/img/fea3.png"
            alt="Image is not found"
            width={500}
            height={500}
          />
        </div>
        <div className="xl:w-3/5 sm:w-full p-5 xl:m-4 sm:m-1">
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
