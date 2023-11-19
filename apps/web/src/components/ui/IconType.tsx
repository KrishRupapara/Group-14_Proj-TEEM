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
      />
    </div>
  );
}
