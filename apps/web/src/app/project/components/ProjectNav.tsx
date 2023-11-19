import NavComponent from "@/components/Navbar";
import Link from "next/link";

export default function ProjectNav() {
  return (
    <div className="bg-white w-screen sticky top-0 overflow-hidden">
      <div className="w-screen border-b-2">
        <NavComponent />
      </div>
      <div className="w-screen border-b py-2">
        <div className="w-4/5 mx-auto flex items-center gap-4 text-lg">
          <Link href="/project/1/tasks">Stream</Link>
          <Link href={"/project/1/upcoming"}>Upcoming</Link>
          <Link href={"/project/1/people"}>People</Link>
          <Link href={"/project/1/work"}>Your work</Link>
        </div>
      </div>
    </div>
  );
}
