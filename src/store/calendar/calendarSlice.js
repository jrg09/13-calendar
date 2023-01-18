import { createSlice } from "@reduxjs/toolkit";
import { addHours, addDays } from "date-fns";

const tmpEvents = [
  {
    _id: "abc123",
    title: "Curso Cuauhtémoc",
    notes: "Curso de Atención a clientes",
    start: new Date(),
    end: addHours(new Date(), 3),
    bgColor: "#6a6b6c",
    user: {
      id: "abc",
      name: "Jorge",
    },
  },
  {
    _id: "abc124",
    title: "Cita Doctor",
    notes: "Llevar radiografias",
    start: addDays(new Date(), 6),
    end: addHours(addDays(new Date(), 6), 2),
    bgColor: "#6a6b6c",
    user: {
      id: "abc",
      name: "Jorge",
    },
  },
];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: tmpEvents,
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) return payload;
        return event;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
