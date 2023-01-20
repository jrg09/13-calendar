import { useCallback, useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { CalendarEvent, CalendarModal, Navbar, AddEventButton, DeleteEventButton } from "../";
import { localizer } from "../../helpers/calendarLocalizer";
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks";
import { getMessagesES } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadEvents } = useCalendarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    startLoadEvents();
  }, []);

  const eventStyleGetter = (event) => {
    // console.log(event, event.user._id, user.uid);

    const isMyEvent = user.uid === event.user?._id || user.uid === event.user?.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465666",
      borderRadius: "0px",
      opacity: "0.8",
      color: "white",
      fontSize: "8pt",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    setActiveEvent(event);
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log("onSelect", event);
    setActiveEvent(event);
  };

  const handleSelectSlot = ({ start, end }) => {
    // console.log("handleSelectSlot", start, end);

    const iniDate = new Date(start).getHours() === 0 ? addHours(start, new Date().getHours() + 1) : start;
    const endDate = new Date(end).getHours() === 0 ? addHours(start, new Date().getHours() + 2) : end;

    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: iniDate,
      end: endDate,
      user,
    });
  };

  const onViewChanged = (event) => {
    // console.log("onViewChanged", event);
    localStorage.setItem("lastView", event);
    setLastView(event);
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
        selectable
        onSelectSlot={handleSelectSlot}
        onView={onViewChanged}
      />
      <CalendarModal />
      <AddEventButton />
      <DeleteEventButton />
    </>
  );
};
