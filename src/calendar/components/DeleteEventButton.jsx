import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";

export const DeleteEventButton = () => {
  const { user } = useAuthStore();
  const { startDeleteEvent, hasEventSelected, activeEvent } = useCalendarStore();
  const { isDateModalOpen } = useUIStore();

  let showButton = false;

  showButton = hasEventSelected;

  showButton =
    showButton &&
    activeEvent &&
    activeEvent.id &&
    activeEvent.user &&
    (activeEvent.user.uid === user.uid || activeEvent.user._id === user.uid);

  const handleClickDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{ display: showButton ? "" : "none" }}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
