import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconType({ type }: { type: string }) {
  return (
    <div className="rounded-full bg-[#CEDBFF] p-3">
      <FontAwesomeIcon
        icon={type === "meet" ? faVideo : faClipboard}
        className="lg:h-10 lg:w-10 sm:h-9 sm:w-9"
      />
    </div>
  );
}
