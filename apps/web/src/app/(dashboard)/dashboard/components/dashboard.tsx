"use client";
import Progressbar from "@/components/ui/progress-bar";
import NavComponent from "@/components/Navbar";
import NavBar from "@/components/newNavbar";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-b from-primaryblue to-white">
      <NavBar />

      <div className="w-5/6 mx-auto h-full">
        {/* Task */}
        <div className="h-[calc(100vh-5rem)] w-full">
          <div className="h-1/4"></div>
          <div className="grid grid-cols-3 h-3/4 w-full p-14 gap-10 ">
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="text-xl font-bold">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={50} />
            </div>
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="font-bold text-xl">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={75} />
            </div>
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="font-bold text-xl">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={50} />
            </div>
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="font-bold text-xl">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={50} />
            </div>
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="font-bold text-xl">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={50} />
            </div>
            <div className=" rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
              <div>
                <h1 className="font-bold text-xl">Project Name</h1>
                <p>Description</p>
              </div>
              <Progressbar percent={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
