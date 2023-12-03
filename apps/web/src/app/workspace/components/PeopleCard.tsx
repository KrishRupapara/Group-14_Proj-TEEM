import { rale } from "@/utils/fonts";
import type { person } from "./PeopleComponent";
export default function PeopleCard({
  type,
  people,
}: {
  type: string;
  people: Array<person> | undefined;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl lg:w-3/5 md:w-4/5 sm:w-4/5 mx-auto py-2 px-5">
      <h1 className="text-2xl font-bold">{type}</h1>
      <ul className={rale.className}>
        {people && people.length > 0 ? (
          people.map((person, i) => <li key={i}> {person.emailID}</li>)
        ) : (
          <p className="mb-2"></p>
        )}
      </ul>
    </div>
  );
}
