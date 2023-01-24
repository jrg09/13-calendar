import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUIStore } from "../../src/hooks/useUIStore";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en hook useUIStore", () => {
  beforeAll(() => jest.clearAllMocks());

  test("01 debe mostrar los valores por defecto", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    // console.log(mockStore.getState().ui.isDateModalOpen);

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    // console.log(result.current);

    expect(result.current).toEqual({
      isDateModalOpen: mockStore.getState().ui.isDateModalOpen,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test("02 debe llamar openDateModal / debe colocar true en isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    // console.log(mockStore.getState().ui.isDateModalOpen);

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { openDateModal } = result.current;

    //es como se manda llamar una función que regresa un hook
    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBe(true);
  });

  test("03 debe llamar openDateModal / debe colocar true en isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const { closeDateModal } = result.current;

    act(() => closeDateModal());

    expect(result.current.isDateModalOpen).toBe(false);
  });
});
