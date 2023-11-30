import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { TaskDialog } from "./ui/task-dialog";

export default function NavComponent() {
  return (
    <div className="bg-white sticky top-0 z-10">
      <div className="h-[4rem]  mx-auto flex border-gray-700/30 border-b px-[5vh]">
        <div className="flex basis-1/4 ">
          <Image
            src="/img/logoblack.png"
            alt="Image Not found"
            width={140}
            height={150}
          />
        </div>
        <ul className="flex  basis-3/4 justify-end items-center gap-7 whitespace-nowrap text-2xl px-[4vh]">
          <li className="hover:font-medium  hover:rounded-md">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li title="Calendar" className="  hover:scale-110">
            <Link href="">
              <FontAwesomeIcon icon={faCalendar} height={28} />
            </Link>
          </li>
          <li title="Add task" className="  hover:scale-110">
            <TaskDialog />
          </li>
          <li title="Notifications" className="  hover:scale-110">
            <Link href="">
              <FontAwesomeIcon icon={faBell} height={28} />
            </Link>
          </li>
          <li title="Profile" className="  hover:scale-110">
            <Link href="/profile">
              <FontAwesomeIcon icon={faUser} height={28} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
