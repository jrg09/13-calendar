import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { DeleteEventButton } from "../../../src/calendar/components/DeleteEventButton";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas sobre DeleteEventButton", () => {
  beforeEach(() => jest.clearAllMocks());

  test("01 debe renderizar el boton", () => {
    //jest.fn().mockReturnValue
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<DeleteEventButton />);
    // screen.debug();

    const button = screen.getByLabelText("btn-delete");

    expect(button.classList.toString()).toContain("btn");
    expect(button.classList.toString()).toContain("btn-danger");
    expect(button.classList.toString()).toContain("fab-danger");
    expect(button.style.display).toBe("none");
  });

  test("02 hacer click sobre el boton y se debe mandar llamar startDeleteEvent", () => {
    //jest.fn().mockReturnValue
    const mockStartDeleteEvent = jest.fn();

    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeleteEvent: mockStartDeleteEvent,
    });

    render(<DeleteEventButton />);
    // screen.debug();

    const button = screen.getByLabelText("btn-delete");

    expect(button.style.display).toBe("");

    fireEvent.click(button);

    expect(mockStartDeleteEvent).toHaveBeenCalledWith();
  });
});
