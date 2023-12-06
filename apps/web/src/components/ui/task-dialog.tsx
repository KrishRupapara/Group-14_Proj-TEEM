import Task from "@/components/CreateTask";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function TaskDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <FontAwesomeIcon icon={faClipboard} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-[#E5F2FF]">
        <Task wsID={id} />
      </DialogContent>
    </Dialog>
  );
}
