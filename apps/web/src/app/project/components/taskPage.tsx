import IconType from "@/components/ui/IconType";
import { rale } from "@/utils/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { cn } from "@/lib/utils";

export default function TaskPage() {
  return (
    <div className="w-screen h-[calc(100vh-5.1rem)] bg-gradient-to-b from-primaryblue to-white">
      <div className="w-4/5 mx-auto pt-5">
        <div className="bg-white px-10 rounded-2xl py-4 shadow-md">
          <div className="flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center justify-between gap-6">
              <IconType type="task" />
              <div>
                <h1 className="font-semibold text-2xl">Task title</h1>
                <p className={rale.className}>Date</p>
              </div>
            </div>
            <h1 className="bg-buttonblue text-white px-4 py-2 tracking-wide text-xl rounded-xl">
              STATUS
            </h1>
          </div>
          <div className="px-20 pt-2">
            <p className={rale.className}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              commodi accusantium voluptate eligendi nihil. Pariatur
              perspiciatis similique atque at officia.
            </p>
          </div>
        </div>

        <div className="mt-5 bg-white px-10 pt-5 pb-10 rounded-2xl shadow-md">
          <h1 className="text-xl font-bold pb-4 border-b-2 border-black">
            Assignee
          </h1>
          <div>
            <Assignee />
            <Assignee />
          </div>
        </div>
      </div>
    </div>
  );
}

const Assignee = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-between mt-8 border-b-2",
        rale.className
      )}
    >
      <div className="flex items-center gap-6 pb-4">
        <FontAwesomeIcon icon={faUser} width={30} height={30} />
        <h1 className="text-xl font-semibold">Voldemort</h1>
      </div>
      <h2 className="text-xl">Role</h2>
    </div>
  );
};
