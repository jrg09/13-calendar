import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUser,
  user,
} from "../../__fixtures__/authFixtures";

describe("Pruebas en authSlice", () => {
  test("01 debe regresar el estado inicial", () => {
    const state = authSlice.getInitialState();
    // console.log(state);
    expect(state).toEqual(initialState);
  });

  test("02 pruebas en reducer onChecking", () => {
    const state = authSlice.reducer(authenticatedState, onChecking());
    // console.log(state);

    expect(state).toEqual(initialState);
  });

  test("03 pruebas en reducer onLogout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    // console.log(state);

    expect(state).toEqual(notAuthenticatedState);
  });

  test("03a pruebas en reducer onLogout(conMensaje)", () => {
    const msg = "Usuario terminó sesión";
    const state = authSlice.reducer(authenticatedState, onLogout(msg));
    // console.log(state);

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage: msg });
  });

  test("04 pruebas en reducer onLogin", () => {
    const state = authSlice.reducer(notAuthenticatedState, onLogin(testUser));
    console.log(state);

    // expect(state).toEqual(notAuthenticatedState);
    expect(state).toEqual(authenticatedState);
  });

  test("05 pruebas en reducer clearErrorMessage", () => {
    const state = authSlice.reducer(authenticatedState, clearErrorMessage());
    expect(state.errorMessage).toEqual(undefined);
  });
});
