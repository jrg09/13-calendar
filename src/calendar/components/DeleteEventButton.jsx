import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";

export const DeleteEventButton = () => {
  const { user } = useAuthStore();
  const { startDeleteEvent, hasEventSelected, activeEvent } = useCalendarStore();
  const { isDateModalOpen } = useUIStore();

  const isMyEvent =
    activeEvent && !isDateModalOpen
      ? user.uid === activeEvent.user?._id || !activeEvent.id || !activeEvent.user
      : false;

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
