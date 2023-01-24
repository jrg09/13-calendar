// import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const DeleteEventButton = () => {
  //const { user } = useAuthStore();
  const { startDeleteEvent, hasEventSelected, activeEvent } = useCalendarStore();

  let showButton = false;

  showButton = hasEventSelected;

  //que haya un evento seleccionado y que el usuario del evento sea el usuario que ha iniciado sesión
  //prettier-ignore
  // showButton = showButton && activeEvent && activeEvent.id && activeEvent.user
  //   && (activeEvent.user.uid === user.uid || activeEvent.user._id === user.uid);

  const handleClickDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{ display: showButton ? "" : "none" }}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
