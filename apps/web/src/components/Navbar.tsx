"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";

export default function NavComponent() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div className="flex flex-col justify-around">
      {/* <div className="bg-white">
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
    </div> */}

      <div>
        <nav className=" w-full mx-auto sticy top-0 left-0 right-0 z-10">
          <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                {/* logo */}
                <Image
                  src="/img/logoblack.png"
                  alt="Image Not found"
                  width={130}
                  height={120}
                />
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <Image
                        src="/img/close.png"
                        width={30}
                        height={30}
                        alt="logo"
                      />
                    ) : (
                      <Image
                        src="/img/menu.png"
                        width={30}
                        height={30}
                        alt="logo"
                        className="focus:border-none active:border-none"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0
                    ${navbar ? "p-12 md:p-0 block" : "hidden"}
                  `}
              >
                <ul className="h-screen md:h-auto font-semibold items-center justify-center md:flex">
                  <li className="pb-6 text-2xl  text-black py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                    <Link href="/dashboard" onClick={() => setNavbar(!navbar)}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="pb-6 text-2xl text-black py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                    <Link href="/calendar" onClick={() => setNavbar(!navbar)}>
                      <FontAwesomeIcon icon={faCalendar} height={28} />
                    </Link>
                  </li>
                  <li className="pb-6 text-2xl text-black py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                    <Link
                      href="/workspace/create"
                      onClick={() => setNavbar(!navbar)}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} />
                    </Link>
                  </li>

                  <li className="pb-6 text-2xl text-black py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                    <Link href="/profile" onClick={() => setNavbar(!navbar)}>
                      <FontAwesomeIcon icon={faUser} height={28} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
