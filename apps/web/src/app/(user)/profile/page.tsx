"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavComponent from "@/components/Navbar";
import UserProfile from "../components/user-profile";

export default function Profilepage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#E5F2FF] flex flex-col relative">
      <NavComponent />
      <div className="flex-grow flex items-center justify-center">
        <div className="h-4/5 my-auto xl:w-1/3 sm:w-4/5 mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center justify-evenly">
          <div className="h-24 w-24 flex items-center justify-center rounded-full bg-[#2222223b]">
            <FontAwesomeIcon icon={faUser} height={50} />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
