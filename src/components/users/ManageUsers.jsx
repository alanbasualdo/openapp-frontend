import { useState } from "react";

export const ManageUsers = ({ createUserClick, setCreateUserClick }) => {
  const [seePassword, setSeePassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    CUIL: "",
    birthdate: "",
    gender: "",
    userName: "",
    email: "",
    password: "",
    admissionDate: "",
    departureDate: "",
  });

  return (
    <div>
      <div>
        {createUserClick ? (
          <button
            className="btn btn-sm btn-danger mb-3"
            onClick={() => setCreateUserClick(false)}
          >
            Cancelar
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary mb-3"
            onClick={() => setCreateUserClick(true)}
          >
            Crear nuevo usuario
          </button>
        )}
      </div>
      {createUserClick && (
        <div className="px-3 mb-3">
          {/* Datos personales */}
          <div>
            <h1 className="text-dark mb-3 font-semibold">Datos personales</h1>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">Nombre</span>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              <span className="input-group-text font-semibold">Apellido</span>
              <input
                type="text"
                className="form-control"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
              <span className="input-group-text font-semibold">CUIL</span>
              <input
                type="number"
                className="form-control"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">
                Fecha de nacimiento
              </span>
              <input type="date" className="form-control" />
              <label className="input-group-text font-semibold">Género</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar género
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">
                Foto de perfil
              </span>
              <input type="file" className="form-control" />
            </div>
          </div>
          <hr className="text-dark mb-3" />
          {/* Datos coportativos */}
          <div>
            <h1 className="text-dark mb-3 font-semibold">Datos corporativos</h1>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">Usuario</span>
              <input type="text" className="form-control" />
              <span className="input-group-text font-semibold">Email</span>
              <input type="text" className="form-control" />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">Contaseña</span>
              <input
                type={seePassword ? "text" : "password"}
                className="form-control"
              />
              <button
                className="btn btn-sm btn-secondary"
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

              <span className="input-group-text font-semibold">
                Repetir contaseña
              </span>
              <input
                type={seePassword ? "text" : "password"}
                className="form-control"
              />
              <button
                className="btn btn-sm btn-secondary"
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

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text font-semibold">
                Fecha de ingreso
              </span>
              <input type="date" className="form-control" />
              <span className="input-group-text font-semibold">
                Fecha de egreso
              </span>
              <input type="date" className="form-control" />
            </div>

            <div className="input-group input-group-sm mb-3">
              <label className="input-group-text font-semibold">Nómina</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar nómina
                </option>
                <option value="Fortecar">Fortecar</option>
                <option value="Granville">Granville</option>
                <option value="Pampawagen">Pampawagen</option>
                <option value="Opencars">Opencars</option>
              </select>
              <label className="input-group-text font-semibold">Sucursal</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar sucursal
                </option>
                <option value="Fortecar">Fortecar</option>
                <option value="Granville Peugeot">Granville Peugeot</option>
                <option value="Granville Citroën">Granville Citroën</option>
                <option value="Pampawagen">Pampawagen</option>
                <option value="Opencars">Opencars</option>
              </select>
              <label className="input-group-text font-semibold">Ciudad</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar Ciudad
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="input-group input-group-sm mb-3">
              <label className="input-group-text font-semibold">Posición</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar posiciónes
                </option>
                <option value="Nada">Nada</option>
              </select>
              <label className="input-group-text font-semibold">Permisos</label>
              <select className="form-select">
                <option defaultValue="" disabled>
                  Seleccionar permiso
                </option>
                <option value="Nada">Nada</option>
              </select>
            </div>
          </div>
          <div>
            <button className="btn btn-sm btn-success">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
};
