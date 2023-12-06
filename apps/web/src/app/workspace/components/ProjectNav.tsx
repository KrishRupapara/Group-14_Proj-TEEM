"use client";
import NavComponent from "@/components/Navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { TaskDialog } from "@/components/ui/task-dialog";
import MeetDialog from "./MeetDialog";

export default function ProjectNav() {
  const router = useParams();
  const { id } = router;

  return (
    <div className="bg-white w-screen sticky top-0 overflow-hidden">
      <div className="w-screen border-b-2">
        <NavComponent />
      </div>
      <div className="flex flex-col w-screen border-b py-2">
        <div className="xl:w-4/5 sm:w-full xl:mx-auto p-1 xl:grid sm:grid xl:grid-cols-2 sm:grid-cols-1 items-center gap-4 text-lg">
          <div className="xl:w-2/3 p-1 flex justify-between items-center xl:gap-5 sm:gap-2 text-lg">
            <Link href={`/workspace/${id}/stream`} className="hover:font-bold">
              Stream
            </Link>
            <Link href={`/workspace/${id}/meet`} className="hover:font-bold">
              Your meet
            </Link>
            <Link href={`/workspace/${id}/people`} className="hover:font-bold">
              People
            </Link>
            <Link href={`/workspace/${id}/work`} className="hover:font-bold">
              Your work
            </Link>
          </div>
          <div className="flex xl:justify-end  items-center gap-8 p-1 text-2xl">
            <TaskDialog id={id as string} />
            <MeetDialog id={id as string} />
            <Link href={`/workspace/${id}/setting`}>
              <FontAwesomeIcon icon={faGear} height={23} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
