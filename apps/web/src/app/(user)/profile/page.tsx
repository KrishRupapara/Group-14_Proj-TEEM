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
      <div className="flex-grow flex items-center justify-center border-2">
        <div className="h-4/5 my-auto md:w-4/5 xl:w-1/3 mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center justify-evenly pb-5">
          <div className="h-24 sm:w-15 md:w-20 lg:w-24 flex items-center justify-center rounded-full bg-[#2222223b]">
            <FontAwesomeIcon icon={faUser} className="xl:h-12 md:h-10 sm:h-9" />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
