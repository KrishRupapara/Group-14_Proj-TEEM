import { rale } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import IconType from "@/components/ui/IconType";
import Link from "next/link";

export default function Tasks({ type }: { type: string }) {
  return (
    <Link href={"/project/1/tasks/1"}>
      <div className="border rounded-2xl bg-white flex items-center justify-between mt-5 px-5 py-2 cursor-pointer hover:bg-[#ebf2ff] transition-all shadow-sm">
        <div className="flex gap-6 items-center">
          <IconType type={type} />
          <div>
            <h1 className="font-semibold text-2xl">Title</h1>
            <p className={cn(rale.className, "text-sm")}>Date</p>
          </div>
        </div>
        <div className="col-end-13  flex flex-col justify-center">
          <button className="rounded-xl lg:px-4 md:px-4 sm:px-5 py-2 text-white tracking-wide bg-[#295BE7] lg:text-xl md:text-lg sm:text-md">
            STATUS
          </button>
        </div>
      </div>
    </Link>
  );
}
