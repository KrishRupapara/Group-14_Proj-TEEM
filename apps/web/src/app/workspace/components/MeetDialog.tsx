import { MeetingForm } from "@/app/workspace/components/createMeet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export default function MeetDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <HoverCard>
          <HoverCardTrigger asChild>
            <FontAwesomeIcon icon={faVideo} className="cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Create a meeting</p>
          </HoverCardContent>
        </HoverCard> */}
        <FontAwesomeIcon icon={faVideo} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="h-fit">
        <MeetingForm wsID={id} />
      </DialogContent>
    </Dialog>
  );
}
