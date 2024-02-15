import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600">
      <div className="border p-5 rounded-lg mx-2">
        <div className="text-center mb-4">
          <h1 className="text-white font-bold text-3xl">OpenApp</h1>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Usuario</span>
          <input
            type="text"
            className="form-control"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
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
          <button className="btn btn-dark">Ingresar</button>
        </div>

        <div className="text-center mt-3">
          <Link className="text-light hover:underline" to="/forgetPassword">
            Olvidé mi contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};
