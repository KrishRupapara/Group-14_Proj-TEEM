import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconType({ type }: { type: string }) {
  return (
    <div className="rounded-full bg-[#CEDBFF] py-3 px-4">
      <FontAwesomeIcon
        icon={type === "meet" ? faVideo : faClipboard}
        className="text-xl"
      />
    </div>
  );
}
