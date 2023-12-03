import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditTask from "./editTask";
import type { taskType, assigneeType } from "./taskPage";

export default function editTaskDialog({
  task,
  assignee,
}: {
  task: taskType;
  assignee: assigneeType[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Button className="bg-blue1 hover:bg-blue-200 text-xl px-24 py-3">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#E5F2FF]">
        <EditTask task={task} assignee={assignee} />
      </DialogContent>
    </Dialog>
  );
}
