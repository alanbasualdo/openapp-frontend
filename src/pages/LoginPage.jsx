import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/Users/useAuthStore";
import { useSelector } from "react-redux";

export const LoginPage = () => {
  const { authLoading } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const { startLogin } = useAuthStore();

  const login = async () => {
    await startLogin(loginData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-opencars">
      <div className="border p-5 rounded-lg mx-2">
        <div className="text-center mb-4">
          <h1 className="text-white font-bold text-3xl">OpenApp</h1>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Usuario</span>
          <input
            type="text"
            className="form-control"
            value={loginData.userName}
            onChange={(e) =>
              setLoginData({ ...loginData, userName: e.target.value })
            }
          />
        </div>

        <div className="input-group mt-3">
          <input
            type={seePassword ? "text" : "password"}
            className="form-control"
            placeholder="Contraseña"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-light bg-light"
            type="button"
            title={seePassword ? "Ocultar" : "Ver"}
            onClick={() => setSeePassword(!seePassword)}
          >
            {seePassword ? (
              <i className="ri-eye-off-line text-black"></i>
            ) : (
              <i className="ri-eye-line text-black"></i>
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-dark"
            onClick={() => login()}
            /*   disabled={!loginData.userName || !loginData.password || authLoading} */
          >
            {authLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              "Ingresar"
            )}
          </button>
        </div>

        <div className="text-center mt-3">
          <Link className="text-white hover:underline" to="/forgetPassword">
            Olvidé mi contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};
