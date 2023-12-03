import Calendar from "../components/calendar";
import NavComponent from "@/components/Navbar";

export default async function UserCalendar() {
  // const res = await fetch(`${process.env.SERVER}/api/events?userID=7`, {
  //   cache: "no-cache",
  // }).then((res) => res.json());

  // console.log(res);

  const allEvents = {};

  // const allEvents = res.map((event: any) => {
  //   return {
  //     // title: event.summary,
  //     // start: new Date(event.start.dateTime).toISOString(),
  //     // end: new Date(event.end.dateTime).toISOString(),
  //     // id: event.id,
  //   };
  // });

  return (
    <div className="">
      <NavComponent />
      <div className="w-4/5 mx-auto mt-5 ">
        <Calendar allEvents={allEvents} />
      </div>
    </div>
  );
}
