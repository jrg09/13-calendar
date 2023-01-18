import { useState } from "react";
import { Calendar } from "react-big-calendar";
import { CalendarEvent, CalendarModal, Navbar, AddEventButton, DeleteEventButton } from "../";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers";
import { useCalendarStore, useUIStore } from "../../hooks";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });
  };

  const onDoubleClick = (event) => {
    setActiveEvent(event);
    openDateModal();
  };

  const onSelect = (event) => {
    console.log("onSelect", event);
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    console.log("onViewChanged", event);
    localStorage.setItem("lastView", event);
    // setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <AddEventButton />
      <DeleteEventButton />
    </>
  );
};
