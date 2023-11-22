import Task from "@/components/CreateTask";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export function TaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Image
          src={"/img/add_icon.svg"}
          alt="Image Not found"
          width={28}
          height={28}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] h-4/5 bg-[#E5F2FF] ">
        <Task />
      </DialogContent>
    </Dialog>
  );
}
