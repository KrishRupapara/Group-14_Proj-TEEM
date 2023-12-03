import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import type { meetType, inviteeType } from "./taskPage";
import { EditMeet } from "./editMeet";

export default function EditMeetDialog({
  meet,
  invitees,
}: {
  meet: meetType;
  invitees: inviteeType[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Button className="bg-blue1 hover:bg-blue-200 text-xl px-24 py-3">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#E5F2FF]">
        {/* <EditTask task={meet} assignee={assignee} /> */}
        <EditMeet meet={meet} invitees={invitees} />
      </DialogContent>
    </Dialog>
  );
}
