import { addDays, addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";

export const AddEventButton = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const onAddNewEvent = () => {
    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: addHours(new Date(), 1),
      end: addHours(new Date(), 2),
      bgColor: "#6a6b6c",
      user: {
        id: "abc",
        name: "Jorge",
      },
    });
  };

  return (
    <button className="btn btn-primary fab" onClick={onAddNewEvent}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
