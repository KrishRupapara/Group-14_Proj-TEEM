import { rale } from "@/utils/fonts";
export default function PeopleCard({
  type,
  people,
}: {
  type: string;
  people: Array<string>;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl lg:w-3/5 md:w-4/5 sm:w-4/5 mx-auto py-2 px-5">
      <h1 className="text-2xl font-bold">{type}</h1>
      <ul className={rale.className}>
        {people.map((person, i) => (
          <li key={i}> {person}</li>
        ))}
      </ul>
    </div>
  );
}
