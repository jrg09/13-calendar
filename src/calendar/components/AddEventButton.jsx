import { addHours } from "date-fns";
import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";

export const AddEventButton = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const onAddNewEvent = () => {
    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: addHours(new Date(), 1),
      end: addHours(new Date(), 2),
      user,
    });
  };

  return (
    <button className="btn btn-primary fab" onClick={onAddNewEvent}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
