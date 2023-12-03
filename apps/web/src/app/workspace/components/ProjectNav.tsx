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
        <div className="w-4/5 mx-auto flex items-center gap-4 text-lg justify-between">
          <div className="flex items-center gap-4 text-lg">
            <Link href={`/workspace/${id}/stream`}>Stream</Link>
            <Link href={`/workspace/${id}/meet`}>Your meet</Link>
            <Link href={`/workspace/${id}/people`}>People</Link>
            <Link href={`/workspace/${id}/work`}>Your work</Link>
          </div>
          <div className="flex items-center justify-between gap-3 text-2xl">
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
