import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //todo: llegar al backend

    //todo: si todo sale bien,
    if (calendarEvent._id) {
      //actualizando evento ecxistente
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      //creando nuevo evento
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
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
  };
};
