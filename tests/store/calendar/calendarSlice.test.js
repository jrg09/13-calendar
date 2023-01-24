import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLogoutCalendar,
  onSetActiveEvent,
  onSetEvents,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import { calendarWithEventsState, events, initialState } from "../../__fixtures__/calendarFixtures";

describe("Pruebas sobre calendarSlice", () => {
  test("01 debe regresar el initialState", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("02 pruebas en onSetActiveEvent", () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[1]));
    expect(state.activeEvent).toEqual(events[1]);
  });

  test("03 pruebas en onAddNewEvent debe agregar nuevo evento", () => {
    const newEvent = {
      id: "3",
      title: "evento 3",
      notes: "lo q sea",
      start: "2023-02-23T12:11:45",
      end: "2023-02-23T12:25:00",
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
    expect(state.events.length).toBe(calendarWithEventsState.events.length + 1);
    expect(state.events[state.events.length - 1]).toEqual(newEvent);
    expect(state.events.some((event) => event.id === newEvent.id)).toBe(true);
  });

  test("04 pruebas en onUpdateEvent debe actualizar evento", () => {
    const tituloActualizado = "evento 1 actualizado";

    const updatedEvent = {
      id: "1",
      title: tituloActualizado,
      notes: "evento q se actualizó",
      start: "2023-02-23T12:11:45",
      end: "2023-02-23T12:25:00",
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));

    expect(state.events).toContain(updatedEvent); //otra forma de evaluar en array
    expect(state.events.find((event) => event.id === updatedEvent.id).title).toBe(tituloActualizado);
  });

  test("05 pruebas en onSetEvents debe actualizar array de eventos", () => {
    const newEvent = {
      id: "3",
      title: "evento 3",
      notes: "evento q se actualizó",
      start: "2023-02-23T12:11:45",
      end: "2023-02-23T12:25:00",
    };
    const newEvents = [...events, newEvent];

    const state = calendarSlice.reducer(calendarWithEventsState, onSetEvents(newEvents));

    expect(state.events).toEqual(newEvents);
  });

  test("06 pruebas en onDeleteEvent debe aeliminar evento activo", () => {
    //setActiveEvent
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));

    //eliminar evento
    const stateDeleted = calendarSlice.reducer(state, onDeleteEvent());

    expect(stateDeleted.events).not.toContain(events[0]);
    expect(stateDeleted.activeEvent).toBe(null);
  });

  test("07 pruebas en onLogoutCalendar debe limpiar el estado", () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());

    expect(state).toEqual(initialState);
  });
});
