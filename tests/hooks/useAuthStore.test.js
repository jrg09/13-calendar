import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarApi from "../../src/api/calendarApi";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { authenticatedState, notAuthenticatedState, initialState, testUser } from "../__fixtures__/authFixtures";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("01 debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ status: "checking", user: {}, errorMessage: undefined });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    // console.log(result.current);

    expect(result.current).toEqual({
      status: mockStore.getState().auth.status,
      user: expect.any(Object),
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
    });
  });

  test("02 pruebas en startLogin", async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin("jorge@mail.es", "jorge1");
    });

    // console.log(result.current);
    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "jrg", uid: expect.any(String) },
    });

    // console.log(localStorage.getItem("token"));

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("02a pruebas en startLogin / debe fallar la autenticación", async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin("jorge@mail.es", "jorge1-quitar");
    });

    // console.log(result.current);
    const { status, user, errorMessage } = result.current;

    // console.log({ status, user, errorMessage });

    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: "Usuario/contraseña no válidos", //o puede ser expect.any(String)
    });

    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-init-date")).toBe(null);

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("03 startRegister / debe registrar al usuario y evitar q llegue al backend", async () => {
    const newUser = { email: "jorge@mail.com", password: "jorge1", name: "Jorge Luis" };

    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "63c8667505b1f5e05270c824",
        name: newUser.name,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M4NjY3NTA1Yj",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser.name, newUser.email, newUser.password);
    });

    const { status, user, errorMessage } = result.current;

    // console.log({ status, user, errorMessage });

    expect({ status, user, errorMessage }).toEqual({
      status: "authenticated",
      user: { name: newUser.name, uid: expect.any(String) },
      errorMessage: undefined,
    });

    spy.mockRestore(); //importante -> cuando se usa spy hay que hacer el restore para que posteriores peticione slleguen al backend
  });

  test("03a startRegister / debe fallar el registro", async () => {
    const newUser = { email: "jorge@mail.es", password: "jorge1", name: "Jorge Luis" };

    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startRegister(newUser.name, newUser.email, newUser.password);
    });

    const { status, user, errorMessage } = result.current;

    // console.log({ status, user, errorMessage });

    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: `Usuario ya existe con email ${newUser.email}.`,
    });
  });

  test("04 checkAuthToken / sin token", async () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("04a checkAuthToken / token", async () => {
    const { data } = await calendarApi.post("/auth", testUser);
    const { uid, name, token } = data;

    localStorage.setItem("token", token);

    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect({ status, user, errorMessage }).toEqual({
      status: "authenticated",
      user: { name: testUser.name, uid: expect.any(String) },
      errorMessage: undefined,
    });
  });

  test("05 startLogout / debe limpiar el localStorage", async () => {
    const mockStore = getMockStore(authenticatedState);

    localStorage.setItem("token", "token de prueba");

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogout();
    });

    expect(localStorage.getItem("token")).toBe(null);
  });
});
