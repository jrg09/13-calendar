import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe("Pruebas sobre uiSlice", () => {
  test("01 prueba inicial del uiSlice", () => {
    // console.log(uiSlice);
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test("02 debe de cambir el isDateModalOPen correctamente", () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBe(true);

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBe(false);
  });
});
