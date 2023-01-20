import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetEvents: (state, { payload = [] }) => {
      state.activeEvent = null;
      state.isLoadingEvents = false;

      //state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) return payload;
        return event;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
      state.activeEvent = null;
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetEvents, onLogoutCalendar } =
  calendarSlice.actions;
