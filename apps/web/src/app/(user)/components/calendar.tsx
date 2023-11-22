"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";

export default function Calendar({ allEvents }: { allEvents: any }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek",
      }}
      events={allEvents as EventSourceInput}
      nowIndicator={true}
      editable={false}
      droppable={true}
      selectable={true}
      selectMirror={true}
      height={"auto"}
      displayEventTime={false}
      //   eventColor="#3788d8"
      //   eventTextColor="#"
      //   eventBackgroundColor="#3788d8"
    />
  );
}
