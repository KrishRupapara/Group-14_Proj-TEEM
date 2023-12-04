"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavComponent from "@/components/Navbar";
import UserProfile from "../components/user-profile";

export default function Profilepage() {
  return (
    <div className="min-h-screen w-screen bg-[#E5F2FF] flex flex-col relative">
      <NavComponent />
      <div className="flex-grow flex items-center justify-center">
        <div className="my-auto xl:w-1/3 sm:w-4/5 mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center justify-evenly py-4">
          <div className="flex items-center justify-center rounded-full bg-[#2222223b] py-6 px-7">
            <FontAwesomeIcon icon={faUser} className="text-4xl" />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
