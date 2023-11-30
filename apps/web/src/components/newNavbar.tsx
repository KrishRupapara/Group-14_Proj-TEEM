import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TaskDialog } from "./ui/task-dialog";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="justify-between h-[3.5rem] md:h-[4rem] px-4 mx-auto lg:max-w-8xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center py-2 h-[3.5rem] md:h-[4rem] justify-between md:py-0 md:block">
              {/* LOGO */}
              <Image
                className="scale-75 md:scale-100"
                src="/img/logo.png"
                alt="Image Not found"
                width={140}
                height={150}
              />

              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    // <Image src="/close.svg" width={30} height={30} alt="logo" />
                    <FontAwesomeIcon icon={faXmark} height={30} />
                  ) : (
                    <FontAwesomeIcon
                      className="focus:border-none active:border-none "
                      icon={faBars}
                      height={30}
                    />
                    // <Image
                    //   src="/hamburger-menu.svg"
                    //   width={30}
                    //   height={30}
                    //   alt="logo"
                    //   className="focus:border-none active:border-none"
                    // />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`md:pt-5 flex-1 justify-self-center pb-3 md:pb-4 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar
                  ? "h-[19.3rem] md:h-full block bg-black md:bg-transparent "
                  : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                <li className="py-4 md:pb-6 text-xl text-white py-2 hover:bg-purple-600 md:hover:bg-transparent md:px-6 text-center border-b-2 md:border-b-0 border-blue-300 ">
                  <Link
                    className="hover:text-[1.35rem] border-blue-300  md:hover:text-blue-300 md:hover:bg-transparent"
                    href="/dashboard"
                    onClick={() => setNavbar(!navbar)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  title="Calender"
                  className=" py-4 md:pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-blue-300  md:hover:bg-transparent"
                >
                  <Link
                    href=""
                    onClick={() => setNavbar(!navbar)}
                    className="md:hover:text-blue-300 "
                  >
                    <FontAwesomeIcon
                      className="hover:scale-110"
                      icon={faCalendar}
                      height={28}
                    />
                  </Link>
                </li>
                <li className="py-4 md:pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-blue-300  md:hover:bg-transparent">
                  {/* <TaskDialog /> */}
                  <Link href="" onClick={() => setNavbar(!navbar)} className="">
                    <TaskDialog />
                  </Link>
                </li>
                <li
                  title="Notifications"
                  className="py-4 md:pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-blue-300  md:hover:bg-transparent"
                >
                  <Link
                    href=""
                    onClick={() => setNavbar(!navbar)}
                    className="md:hover:text-blue-300 "
                  >
                    <FontAwesomeIcon
                      className="hover:scale-110"
                      icon={faBell}
                      height={28}
                    />
                  </Link>
                </li>
                <li
                  title="Profile"
                  className="py-4 md:pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-blue-300  md:hover:bg-transparent"
                >
                  <Link
                    href="/profile"
                    onClick={() => setNavbar(!navbar)}
                    className="md:hover:text-blue-300 "
                  >
                    <FontAwesomeIcon
                      className="hover:scale-110"
                      icon={faUser}
                      height={28}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
