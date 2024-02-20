import { useState } from "react";

export const RightSidebar = ({ showRightbar, showContent }) => {
  const [searchUser, setSetSearchUser] = useState(false);
  const [openChat, setOpenChat] = useState(false);

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
          className="offcanvas-end show bg-dark text-white relative"
          style={{
            height: "calc(100vh - 60px)",
            width: showContent ? "850px" : "100vw",
            position: !showContent && "absolute",
          }}
          tabIndex="-1"
        >
          {openChat ? (
            /* Chat */
            <div className="mt-2">
              <div className="mx-auto">
                <div
                  className="px-2 mx-1 mb-2 row text-sm"
                  style={{
                    height: "50px",
                  }}
                >
                  <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <img
                      className="rounded-full bg-gray-50"
                      src="https://api.opencars.com.ar/api/download/usuarios/20382826001"
                      alt="Foto de perfil"
                      style={{
                        objectFit: "cover",
                        width: "45px",
                        height: "45px",
                      }}
                    />
                  </div>
                  <div className="col-md-7 d-flex align-items-center justify-content-start">
                    <p className="text-gray-400 font-bold text-md">
                      Alan Basualdo
                    </p>
                  </div>
                  <div
                    className="col-md-2 d-flex align-items-center justify-content-center"
                    onClick={() => setOpenChat(false)}
                    title="Cerrar"
                  >
                    <i className="ri-close-fill text-lg cursor-pointer text-gray-400 font-bold text-md hover:text-gray-300"></i>
                  </div>
                </div>

                <hr className="text-gray-400 mx-2" />

                {/* Contenido del chat */}
                <div
                  className="px-2"
                  style={{
                    overflowY: "auto",
                    height: "calc(100vh - 180px)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="p-2 flex-grow">
                    {/* Mensaje recibio */}
                    <div className="bg-light px-2 py-1 rounded-lg max-w-60 mb-1">
                      <p className="text-dark font-medium w-full">hola mundo</p>
                      <p className="text-right text-xs text-gray-500">12:00</p>
                    </div>
                    {/* Mensaje enviado */}
                    <div className="bg-primary px-2 py-1 rounded-lg max-w-60 mb-1 ml-auto">
                      <p className="text-light font-medium text-right w-full">
                        hola mundo
                      </p>
                      <p className="text-xs text-gray-300">12:00</p>
                    </div>
                  </div>
                </div>

                <hr className="text-gray-400 mx-2" />

                <div
                  className="flex items-center justify-center text-light px-2 bg-dark"
                  style={{ height: "50px" }}
                >
                  <div className="w-full max-w-lg mx-auto">
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 border-none bg-transparent outline-none focus:ring-0 p-2"
                        placeholder="Escribe un mensaje"
                        autoFocus
                      />
                      <div
                        className="flex items-center justify-center w-16"
                        title="Enviar"
                      >
                        <i className="ri-send-plane-fill text-gray-300 hover:text-gray-50 font-semibold text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Lista de colaboradores */
            <div className="mt-2">
              <div className="mx-auto p-1">
                <div className="px-2 mx-1 mb-2 row text-sm">
                  <div className="col-md-10 col-sm-8 col-xs-6 d-flex align-items-start">
                    {searchUser ? (
                      <div className="font-bold text-md text-gray-400 py-2">
                        <input
                          type="text"
                          className="border-none outline-none bg-transparent focus:ring-0 w-full"
                          placeholder="Buscar colaborador"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="text-gray-400 font-bold text-md py-2">
                        <p>Colaboradores</p>
                      </div>
                    )}
                  </div>
                  {searchUser ? (
                    <div
                      className="col-md-2 col-sm-4 col-xs-6 d-flex align-items-center justify-content-center py-2"
                      onClick={() => setSetSearchUser(false)}
                      title="Cerrar"
                    >
                      <i className="ri-close-fill cursor-pointer text-gray-400 hover:text-gray-300 font-bold text-md"></i>
                    </div>
                  ) : (
                    <div
                      className="col-md-2 col-sm-4 col-xs-6 d-flex align-items-center justify-content-center py-2"
                      onClick={() => setSetSearchUser(true)}
                      title="Buscar"
                    >
                      <i className="ri-search-line cursor-pointer text-gray-400 hover:text-gray-300 font-bold text-md"></i>
                    </div>
                  )}
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
                        className="flex justify-between rounded-lg py-2 px-1 cursor-pointer hover:bg-gray-700"
                        onClick={() => setOpenChat(true)}
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
          )}
        </div>
      )}
    </>
  );
};
