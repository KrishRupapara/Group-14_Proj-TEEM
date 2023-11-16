import NavComponent from "@/components/ui/navbar";
import Link from "next/link";
import React from "react";

export default function ProjectNav() {
  return (
    <div className="bg-white w-screen sticky top-0 overflow-hidden">
      <div className="w-screen border-b-2">
        <NavComponent />
      </div>
      <div className="w-screen border-b py-2">
        <div className="w-4/5 mx-auto flex items-center gap-4 text-lg">
          <Link href={""}>Stream</Link>
          <Link href={""}>Upcoming</Link>
          <Link href={""}>People</Link>
          <Link href={""}>Your work</Link>
        </div>
      </div>
    </div>
  );
}
