import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
const Calendar = () => {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([
    { title: "event 1", date: "2024-09-24" },
    { title: "event 2", date: "2024-09-29" },
  ]);

  return (
    <div className="p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventBackgroundColor="#33e633"
        eventBorderColor="#33e633"
      />
    </div>
  );
};

export default Calendar;
