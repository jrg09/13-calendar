import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";
import { onDeleteEvent } from "../../store";

export const DeleteEventButton = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{ display: hasEventSelected ? "" : "none" }}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
