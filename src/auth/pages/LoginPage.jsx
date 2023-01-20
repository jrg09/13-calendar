import React, { useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { LoadingSpinner } from "../../ui/components/loadingSpinner";
import "./login.css";

const loginFields = {
  loginEmail: "",
  loginPassword: "",
};
const registerFields = {
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
  registerName: "",
};

export const LoginPage = () => {
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFields);
  const {
    registerEmail,
    registerPassword,
    registerPassword2,
    registerName,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFields);

  const { status, errorMessage, startLogin, startRegister } = useAuthStore();

  const isChecking = useMemo(() => status === "checking", [status]);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    console.log({ loginEmail, loginPassword });
    startLogin(loginEmail, loginPassword);
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    console.log({ registerEmail, registerPassword, registerPassword2, registerName });

    if (registerPassword !== registerPassword2) {
      Swal.fire("Registro de usuario", "Las contraseñas no son iguales", "warning");
      return;
    }

    startRegister(registerName, registerEmail, registerPassword);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Ocurrió un problema", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                autoComplete="off"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <button type="submit" className="btnSubmit spinner-container" disabled={isChecking}>
                Login
                {isChecking ? <LoadingSpinner /> : <></>}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                autoComplete="off"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                autoComplete="off"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <button type="submit" className="btnSubmit spinner-container" disabled={isChecking}>
                Crear cuenta
                {isChecking ? <LoadingSpinner /> : <></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
