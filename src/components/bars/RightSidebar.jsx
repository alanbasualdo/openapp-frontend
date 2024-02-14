import { useState } from "react";
import { Link } from "react-router-dom";

export const RightSidebar = ({ showRightbar }) => {
  const [searchUser, setSetSearchUser] = useState(false);

  const listaUsuarios = [
    {
      id: 1,
      username: "usuario1",
      nombre: "Alan Basualdo",
      puesto: "Desarrollador",
    },
    {
      id: 2,
      username: "usuario2",
      nombre: "Diego Gatica",
      puesto: "Jefe de IT",
    },
    {
      id: 3,
      username: "usuario3",
      nombre: "Gaspar Diaz",
      puesto: "Infraestructura y Redes",
    },
    {
      id: 4,
      username: "usuario4",
      nombre: "Lucas Bian",
      puesto: "Desarrollador",
    },
    { id: 5, username: "usuario5", nombre: "Nombre Usuario 5" },
    { id: 6, username: "usuario1", nombre: "Nombre Usuario 1" },
    { id: 7, username: "usuario2", nombre: "Nombre Usuario 2" },
    { id: 8, username: "usuario3", nombre: "Nombre Usuario 3" },
    { id: 9, username: "usuario4", nombre: "Nombre Usuario 4" },
    { id: 10, username: "usuario5", nombre: "Nombre Usuario 5" },
    { id: 11, username: "usuario1", nombre: "Nombre Usuario 1" },
    { id: 12, username: "usuario2", nombre: "Nombre Usuario 2" },
    { id: 13, username: "usuario3", nombre: "Nombre Usuario 3" },
    { id: 14, username: "usuario4", nombre: "Nombre Usuario 4" },
    { id: 15, username: "usuario5", nombre: "Nombre Usuario 5" },
  ];

  return (
    <>
      {showRightbar && (
        <div
          className="offcanvas-end show bg-dark relative w-50"
          style={{ height: "calc(100vh - 60px)" }}
          tabIndex="-1"
        >
          <div className="px-4 mt-3">
            <div className="mx-auto p-2">
              <div className="px-2 mx-1 mb-2 row text-sm">
                <div className="col-md-11 d-flex flex-column justify-content-center text-gray-400 font-bold text-md mb-2">
                  {searchUser ? (
                    <div className="">
                      <input
                        type="text"
                        className="border-none outline-none bg-transparent focus:ring-0 w-full"
                        placeholder="Buscar colaborador"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <p>Colaboradores</p>
                  )}
                </div>
                <div className="col-md-1 d-flex text-end flex-column justify-content-center text-gray-400 font-bold text-md mb-2">
                  {searchUser ? (
                    <i
                      className="ri-close-fill cursor-pointer hover:text-gray-300"
                      onClick={() => setSetSearchUser(false)}
                      title="Cerrar"
                    ></i>
                  ) : (
                    <i
                      className="ri-search-line cursor-pointer hover:text-gray-300"
                      onClick={() => setSetSearchUser(true)}
                      title="Buscar"
                    ></i>
                  )}
                </div>
              </div>

              <hr className="text-gray-400 mb-2" />

              <div
                className="offcanvas-body pr-2"
                style={{
                  overflowY: "auto",
                  maxHeight: "calc(95vh - 100px)",
                }}
              >
                <ul>
                  {listaUsuarios.map((usuario) => (
                    <li
                      key={usuario.id}
                      className="flex justify-between rounded-lg p-2 cursor-pointer hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-x-5">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                          src="https://api.opencars.com.ar/api/download/usuarios/20382826001"
                          alt="Foto de perfil"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-200">
                            {usuario.nombre}
                          </p>
                          <p
                            className="mt-1 truncate text-xs font-medium leading-5 text-gray-400"
                            style={{ width: "200px" }}
                          >
                            {usuario.puesto}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 font-medium text-gray-400">
                          En línea
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
