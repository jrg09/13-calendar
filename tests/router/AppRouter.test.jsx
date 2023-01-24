import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

const mockCheckAuthToken = jest.fn();

describe("Pruebas sobre AppRouter", () => {
  beforeEach(() => jest.clearAllMocks());

  test("01 debe renderizar con status checking", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug();

    //debe mostrar un div de spinner
    expect(container.getElementsByClassName("spinner-container").length).toBe(1);
    expect(mockCheckAuthToken).toHaveBeenCalledWith();
  });

  test("02 debe mostrar la pantalla de login si no está autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug();
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar el calendario si estamos autenticados", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter initialEntries={["/auth/login"]}>
        <AppRouter />
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
