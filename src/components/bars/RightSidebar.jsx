import { useState } from "react";
import { Link } from "react-router-dom";

export const RightSidebar = ({ showRightbar }) => {
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
          className="offcanvas-end show bg-primary relative w-50"
          style={{ height: "calc(100vh - 60px)" }}
          tabIndex="-1"
        >
          <div className="text-sm">
            <div className="px-4 mt-3">
              <div className="container mb-4 text-white">
                <div className="row">
                  <div className="col-md-5 d-flex flex-column justify-content-center">
                    <h1 className="text-center mb-3 font-bold text-lg">
                      Alan Basualdo
                    </h1>
                    <ul className="ml-5">
                      <li className="list-disc mb-2">
                        <Link className="hover:font-bold" to="/createTicket">
                          Mis vacaciones
                        </Link>
                      </li>
                      <li className="list-disc mb-2">
                        <Link className="hover:font-bold" to="/createTicket">
                          Mis haberes
                        </Link>
                      </li>
                      <li className="list-disc mb-2">
                        <Link className="hover:font-bold" to="/createTicket">
                          Mi CV
                        </Link>
                      </li>
                      <li className="list-disc mb-2">
                        <Link className="hover:font-bold" to="/createTicket">
                          Cambiar contraseña
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-7 offcanvas-header">
                    <div
                      className="mx-auto bg-white"
                      style={{
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      <img
                        src="https://api.opencars.com.ar/api/download/usuarios/20382826001"
                        alt="Imagen de perfil"
                        className="rounded-xl p-1"
                        style={{
                          objectFit: "cover",
                          width: "180px",
                          height: "180px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mx-auto py-3 px-2 bg-white rounded-xl"
                style={{
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                  overflowY: "auto",
                  maxHeight: "calc(80vh - 100px)",
                }}
              >
                <div className="px-2">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar colaborador"
                    />
                  </div>
                </div>
                <div className="offcanvas-body text-white">
                  <ul>
                    {listaUsuarios.map((usuario) => (
                      <li
                        key={usuario.id}
                        className="flex justify-between rounded-lg p-2 cursor-pointer hover:bg-gray-200"
                      >
                        <div className="flex items-center gap-x-5">
                          <div
                            className="bg-white h-20 w-20 rounded-full"
                            style={{
                              boxShadow:
                                "2px 1px 17px 2px rgba(0,0,0,0.75) inset",
                            }}
                          >
                            <img
                              className="h-20 w-20 p-1 flex-none rounded-full bg-gray-50 object-cover"
                              src="https://api.opencars.com.ar/api/download/usuarios/20382826001"
                              alt="Foto de perfil"
                            />
                          </div>
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-800">
                              {usuario.nombre}
                            </p>
                            <p
                              className="mt-1 truncate text-xs font-medium leading-5 text-gray-500"
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
                          <p className="text-xs leading-5 font-medium text-gray-600">
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
        </div>
      )}
    </>
  );
};
