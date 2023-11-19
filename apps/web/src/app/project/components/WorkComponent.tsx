import Tasks from "./tasks";

export default function WorkComponent() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-primaryblue to-white">
      <div className="w-4/5 mx-auto pt-5">
        <Tasks type="task" />
        <Tasks type="meet" />
      </div>
    </div>
  );
}
