import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export default function PeopleCard({
  type,
  people,
}: {
  type: string;
  people: Array<string>;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl w-3/5 mx-auto py-2 px-5">
      <h1 className="text-2xl font-bold">{type}</h1>
      <ul className={raleway.className}>
        {people.map((person, i) => (
          <li key={i}> {person}</li>
        ))}
      </ul>
    </div>
  );
}
