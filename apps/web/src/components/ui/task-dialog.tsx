import Task from "@/components/CreateTask";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {/* <Image
          src={"/img/add_icon_white.png"}
          alt="Image Not found"
          width={28}
          height={28}
        /> */}

        <FontAwesomeIcon
          className="hover:scale-110 md:hover:text-blue-300"
          icon={faPlus}
          height={30}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] h-4/5 bg-[#E5F2FF] ">
        <Task />
      </DialogContent>
    </Dialog>
  );
}
