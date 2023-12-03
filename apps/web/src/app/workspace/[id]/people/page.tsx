// import PeopleCard from "../../components/PeopleCard";
import PeopleComponent from "../../components/PeopleComponent";

export default function PeoplePage({ params }: { params: { id: string } }) {
  return (
    <div className="h-[calc(100vh-8rem)] w-screen bg-gradient-to-b from-primaryblue to-white">
      <div className="flex flex-col items-center gap-3 pt-10">
        <PeopleComponent wsID={params.id} />
        {/* <PeopleCard type="Project Manager" people={["Nobody", "Bobody"]} />
        <PeopleCard type="Teammates " people={["Nobody", "Bobody"]} />
        <PeopleCard type="Collaborators" people={["Nobody", "Bobody"]} />
        <PeopleCard type="Clients" people={["Nobody", "Bobody", "Nobody"]} /> */}
      </div>
    </div>
  );
}
