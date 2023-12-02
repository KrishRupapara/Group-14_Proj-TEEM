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
      <div className="h-[5rem] w-4/5 mx-auto flex flex-row items-center justify-between">
        <div>
          <Image
            src="/img/logoblack.png"
            alt="Image Not found"
            width={140}
            height={150}
          />
        </div>
        <ul className="flex gap-6 whitespace-nowrap justify-around items-center text-2xl">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/calendar">
              <FontAwesomeIcon icon={faCalendar} height={28} />
            </Link>
          </li>
          <li>
            <TaskDialog />
          </li>
          <li>
            <Link href="">
              <FontAwesomeIcon icon={faBell} height={28} />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <FontAwesomeIcon icon={faUser} height={28} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
