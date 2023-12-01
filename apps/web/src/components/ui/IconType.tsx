import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconType({ type }: { type: string }) {
  return (
    <div className="rounded-full bg-[#CEDBFF] p-3">
      <FontAwesomeIcon
        icon={type === "meet" ? faVideo : faClipboard}
        height={30}
        width={30}
        className="lg:h-12 lg:w-12 md:h-10 md:w-10 sm:h-9 sm:w-9 h-7 w-5"
      />
    </div>
  );
}
