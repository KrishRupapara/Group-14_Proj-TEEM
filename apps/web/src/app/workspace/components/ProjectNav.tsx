import NavComponent from "@/components/Navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import NavLink from "./NavLink";

export default function ProjectNav() {
  return (
    <div className="bg-white w-screen sticky top-0 overflow-hidden">
      <div className="w-screen border-b-2">
        <NavComponent />
      </div>
      <div className="flex flex-col w-screen border-b py-2">
        <div className="w-4/5 mx-auto flex items-center gap-4 text-lg justify-between">
          <div className="flex items-center gap-4 text-lg">
            <NavLink />
          </div>
          <div>
            <Link href={"/workspace/1/setting"}>
              <FontAwesomeIcon icon={faGear} height={23} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
