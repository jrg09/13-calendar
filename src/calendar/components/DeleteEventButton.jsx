import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";
import { onDeleteEvent } from "../../store";

export const DeleteEventButton = () => {
  const { user } = useAuthStore();
  const { startDeleteEvent, hasEventSelected, activeEvent } = useCalendarStore();

  const isMyEvent = activeEvent ? user.uid === activeEvent.user._id || user.uid === activeEvent.user.uid : false;

  const handleClickDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{ display: isMyEvent && hasEventSelected ? "" : "none" }}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
