import PeopleCard from "./PeopleCard";

export type peopleType = {
  People: {
    Manager: Array<person>;
    Client: Array<person>;
    Collaborator: Array<person>;
    Teammate: Array<person>;
  };
};

export type person = {
  userID: number;
  userName: string;
  emailID: string;
  role: string;
};

export default function PeopleComponent({ data }: { data: peopleType }) {
  return (
    <>
      {/* Project Manager */}
      <PeopleCard type="Manager" people={data?.People.Manager} />
      <PeopleCard type="Client" people={data?.People.Client} />
      <PeopleCard type="Collaborator" people={data?.People.Collaborator} />
      <PeopleCard type="Teammate" people={data?.People.Teammate} />
    </>
  );
}
