"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const array = [
  {
    index: 0,
    src: "/img/pic1.png",
  },
  {
    index: 1,
    src: "/img/pic2.png",
  },
  {
    index: 2,
    src: "/img/pic3.png",
  },
];

export default function Schedulepage() {
  const [id, setId] = useState(0);
  return (
    <div className="bg-blue-100 xl:h-screen sm:h-full">
      {/* upper half */}
      <div className="xl:w-4/5 sm:w-full mx-auto xl:grid xl:grid-cols-12 xl:h-1/4 p-5">
        <div className="xl:col-span-9 flex flex-col justify-around">
          <h1 className="font-bold text-3xl font-sans my-5">
            Scheduling made easy!
          </h1>
          <p className="xl:w-3/4 sm:w-full">
            Jump into the world of smoother collaborations, fewer headaches, and
            more meaningful outcomes.
            <br /> <br />
            Say goodbye to the chaos of endless emails, missed deadlines, and
            ineffective meetings. Get things done hassle-free without scheduling
            coming in the way. You just have to give your calendars and leave
            the rest to us.
          </p>
        </div>
      </div>

      {/* bottom half */}
      <div className="xl:flex sm:flex sm:flex-col xl:flex-row xl:w-4/5 sm:w-full mx-auto xl:h-3/4 sm:h-full items-center gap-5 mt-5 p-2">
        <div className="xl:w-1/2 sm:w-full xl:flex justify-between xl:flex-col sm:flex sm:flex-row">
          <button
            onClick={() => setId(0)}
            className={cn(
              "text-left p-3",
              id === 0 &&
                "bg-white border-l-blue-500 border-l-8 rounded-xl shadow-2xl"
            )}
          >
            <h1 className="font-bold text-xl">Progress Tracking:</h1>
            Teem helps you monitor and manage meeting progress by setting clear
            agendas and recording meeting minutes, ensuring everyone stays
            accountable and on track.
          </button>
          <br />

          <button
            onClick={() => setId(1)}
            className={cn(
              "text-left p-3",
              id === 1 &&
                "bg-white border-l-blue-500 border-l-8 rounded-xl shadow-2xl"
            )}
          >
            <h1 className="font-bold text-xl">Meeting Organisation:</h1>
            Teem also helps you keep track of meeting progress, to set agendas,
            record minutes, and ensure that every meeting stays on track.
          </button>
          <br />

          <button
            onClick={() => setId(2)}
            className={cn(
              "text-left p-3",
              id === 2 &&
                "bg-white border-l-blue-500 border-l-8 rounded-xl shadow-2xl"
            )}
          >
            <h1 className="font-bold text-xl">Assignment Management:</h1>
            Teem enables you to efficiently manage tasks and assignments for
            each project, ensuring that nothing falls through the cracks and
            helping you stay organized.
          </button>
          <br />
        </div>
        <div className="xl:w-1/2 sm:w-full items-center justify-center p-5">
          {/* <p>{name1}</p> */}
          <Image
            alt="image not found"
            src={array[id].src}
            width={600}
            height={300}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
