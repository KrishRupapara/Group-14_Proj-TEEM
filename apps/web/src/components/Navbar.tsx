import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="bg-white  h-[4rem] flex px-5 border-gray-700/30 border-b">
      <div className="flex basis-1/4">
        <Image
          src="/img/logoblack.png"
          alt="Image Not found"
          width={150}
          height={150}
        />
      </div>

      <div className="flex basis-3/4 justify-end items-center">
        <div className="px-2 rounded-full font-medium hover:font-semibold hover:bg-[#eef6ff] ">
          <a href="">
            <p>Your Work</p>
          </a>
        </div>
        <div className="px-2 rounded-full font-medium hover:font-semibold hover:bg-[#eef6ff] ">
          <a href="">
            <p>Dashboard</p>
          </a>
        </div>
        <div className="px-3">
          <a href="">
            <img
              title="Add Workspace"
              src="/img/addicon.png"
              alt="Not Found"
              width={30}
              className="hover:bg-[#eef6ff]  hover:scale-110"
            />
          </a>
        </div>
        <div className="px-3">
          <a href="">
            <img
              title="Calendar"
              src="/img/calendar.png"
              alt="Not Found"
              width={30}
              className="hover:bg-[#eef6ff]  hover:scale-110"
            />
          </a>
        </div>
        <div className="px-3">
          <a href="">
            <img
              title="Notifications"
              src="/img/notification.png"
              alt="Not Found"
              width={30}
              className="hover:bg-[#eef6ff]  hover:scale-110"
            />
          </a>
        </div>
        <div className="px-3">
          <a href="">
            <img
              title="Profile"
              src="/img/usericon.png"
              alt="Not Found"
              width={23}
              className="hover:bg-[#eef6ff]  hover:scale-110"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
