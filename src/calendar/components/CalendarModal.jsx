import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import "./modal.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks";

export const CalendarModal = () => {
  registerLocale("es", es);

  const { isDateModalOpen, closeDateModal } = useUIStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: addHours(new Date(), 1),
    end: addHours(new Date(), 2),
  });

  // console.log("activeEvent", activeEvent ? true : false);
  // console.log("activeEvent.id?", activeEvent && activeEvent.id ? true : false);

  const isMyEvent = useMemo(
    () => (activeEvent ? user.uid === activeEvent.user?._id || !activeEvent.id || !activeEvent.user : false),
    [activeEvent]
  );

  const modalTitle = useMemo(
    () => (activeEvent && activeEvent.id ? "Actualizar evento" : "Nuevo evento"),
    [activeEvent]
  );

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.trim().length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    // console.log("cerrando modal");
    closeDateModal();
    setFormSubmitted(false);
  };

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChange = (event, type) => {
    setFormValues({ ...formValues, [type]: event });

    //
    if (type === "start") {
      const diffSeconds = differenceInSeconds(formValues.end, formValues.start);

      if (diffSeconds <= 0 || isNaN(diffSeconds)) {
        onDateChange(addHours(formValues.start, 2), "end");
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const diffSeconds = differenceInSeconds(formValues.end, formValues.start);

    if (diffSeconds <= 0 || isNaN(diffSeconds)) {
      // console.log("Fechas inválidas");
      Swal.fire("Fechas incorrectas", "Revisa fecha de inicio y fin del evento", "error");
      return;
    }

    if (formValues.title.trim().length == 0) {
      // console.log("Título del evento requerido");
      return;
    }

    // console.log(formValues);

    await startSavingEvent(formValues);

    setFormSubmitted(false);

    closeDateModal();
  };

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={100}>
        <h1>{modalTitle}</h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              className="form-control"
              onChange={(event) => onDateChange(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className="form-control"
              onChange={(event) => onDateChange(event, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Título del evento</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}></textarea>
          </div>

          {activeEvent && activeEvent.user && (
            <div className="form-group mb-2">
              <small className="form-text text-muted">
                <strong>Creado por:</strong> {activeEvent.user.name}
              </small>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            style={{ display: isMyEvent ? "" : "none" }}>
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
