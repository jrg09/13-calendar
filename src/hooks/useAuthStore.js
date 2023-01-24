import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    // console.log("startLogin", { email, password });

    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      // console.log(data);

      //login correcto
      setTokenAndLogin(data.name, data.uid, data.token);
    } catch (error) {
      // console.log("error", error);

      dispatch(onLogout("Usuario/contraseña no válidos"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (name, email, password) => {
    // console.log("startRegister", { name, email, password });

    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", { name, email, password });

      // console.log(data);

      //registro correcto
      setTokenAndLogin(data.name, data.uid, data.token);
    } catch (error) {
      // console.log("error", error);

      let errorMsg = error.response?.data?.msg || "Sin mensaje de error";

      if (error.response?.data?.errors) {
        errorMsg = "Hay errores de validación en el registro.";
      }

      dispatch(onLogout(errorMsg));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get("/auth/renew");
      // console.log(data);

      setTokenAndLogin(data.name, data.uid, data.token);
    } catch (error) {
      // console.error("error", error);
      localStorage.clear();
      return dispatch(onLogout("Sesión expirada."));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  const setTokenAndLogin = (name, uid, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(onLogin({ name, uid }));
  };

  return {
    //propiedades
    status,
    user,
    errorMessage,

    //métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
