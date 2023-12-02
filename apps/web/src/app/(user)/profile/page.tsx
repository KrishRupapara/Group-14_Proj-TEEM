"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavComponent from "@/components/Navbar";
import UserProfile from "../components/user-profile";
import NavBar from "@/components/newNavbar";

export default function Profilepage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#E5F2FF] flex flex-col relative">
      <NavBar />
      <div className="flex-grow flex items-center mt-2 justify-center border-2">
        <div className="h-5/6 my-auto md:w-11/12 xl:w-1/3 lg:w-4/5 mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center justify-evenly pb-5">
          <div className="px-6 py-5 flex items-center mt-5 justify-center rounded-full bg-[#2222223b]">
            <FontAwesomeIcon icon={faUser} className="xl:h-12 md:h-10 sm:h-9" />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
