import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onSetEvents } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToCalendarEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startLoadEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      // console.log(data.eventos);
      const events = convertEventsToCalendarEvents(data.eventos);
      dispatch(onSetEvents(events));
    } catch (error) {
      console.error("error", error);
    }
  };

  const startSavingEvent = async (calendarEvent) => {
    // console.log("startSavingEvent", calendarEvent);

    try {
      //actualizar evento
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent(calendarEvent));
        return;
      }

      //creando nuevo evento
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id }));
    } catch (error) {
      console.error("error", error); //axios error
      Swal.fire("Error al guardar", error.response?.data?.msg, "error");
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.error("error", error); //axios error
      Swal.fire("Error al eliminar", error.response.data?.msg, "error");
    }
  };

  return {
    //propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadEvents,
  };
};
