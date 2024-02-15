import { Link } from "react-router-dom";

export const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="border p-5 rounded-lg mx-2">
        <div className="text-center mb-4">
          <h1 className="text-white font-bold text-3xl">OpenApp</h1>
          <h4 className="text-white text3xl mt-4">
            ¿Desea solicitar la recuperación de su clave?
          </h4>
          <h4 className="text-white text3xl mt-4">
            Si su cuenta de acceso tiene asociado un correo electrónico, le
            llegará una clave temporal autogenerada por el sistema.
          </h4>
          <h4 className="text-white text3xl mt-4">
            Si no tiene correo electrónico asociado, un administrador se
            comunicará con usted para proveerle la clave temporal.
          </h4>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input type="email" className="form-control" />
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-dark">Confirmar solicitud</button>
        </div>

        <div className="text-center mt-3">
          <Link className="text-light hover:underline" to="/login">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};
