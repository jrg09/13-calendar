export const events = [
  {
    id: "1",
    title: "evento",
    notes: "notas del evento",
    start: "2023-01-23T12:11:45",
    end: "2023-01-23T12:25:00",
  },
  {
    id: "2",
    title: "evento 2",
    notes: "curso",
    start: "2023-02-23T12:11:45",
    end: "2023-02-23T12:25:00",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
