import { useState } from "react";
import { useSelector } from "react-redux";

export const RightSidebar = ({ showRightbar, showContent, user }) => {
  const [searchUser, setSetSearchUser] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const { users } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showRightbar && (
        <div
          className="offcanvas-end show bg-dark text-white relative px-1"
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
                  <div className="col-md-10 col-10 d-flex align-items-center">
                    <img
                      className="rounded-full bg-gray-50"
                      src={`https://api.opencars.com.ar/api/download/usuarios/${user.cuil}`}
                      alt="Foto de perfil"
                      style={{
                        objectFit: "cover",
                        width: "45px",
                        height: "45px",
                      }}
                    />
                    <p className="text-gray-400 font-bold text-md ml-4">
                      Alan Basualdo
                    </p>
                  </div>
                  <div
                    className="col-md-2 col-2 d-flex align-items-center justify-content-center"
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
                  <div className="col-md-10 col-10 d-flex align-items-center">
                    {searchUser ? (
                      <div className="font-bold text-md text-gray-400 py-2 w-full">
                        <input
                          type="text"
                          className="border-none outline-none bg-transparent focus:ring-0 w-full"
                          placeholder="Buscar colaborador"
                          autoFocus
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
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
                      className="col-md-2 col-2 d-flex align-items-center"
                      onClick={() => {
                        setSetSearchUser(false);
                        setSearch("");
                      }}
                      title="Cerrar"
                    >
                      <i className="ri-close-fill cursor-pointer text-gray-400 hover:text-gray-300 font-bold text-md"></i>
                    </div>
                  ) : (
                    <div
                      className="col-md-2 col-2 d-flex align-items-center"
                      onClick={() => setSetSearchUser(true)}
                      title="Buscar"
                    >
                      <i className="ri-search-line cursor-pointer text-gray-400 hover:text-gray-300 font-bold text-md"></i>
                    </div>
                  )}
                </div>

                <hr className="text-gray-400 mb-2" />

                <div
                  className="offcanvas-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "calc(95vh - 100px)",
                  }}
                >
                  <ul>
                    {filteredUsers.map((user) => (
                      <li
                        key={user._id}
                        className="flex justify-between rounded-lg py-2 px-2 cursor-pointer hover:bg-gray-700"
                        onClick={() => setOpenChat(true)}
                      >
                        <div className="flex items-center gap-x-5">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                            src={`https://api.opencars.com.ar/api/download/usuarios/${user.cuil}`}
                            alt="Foto de perfil"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-200">
                              {user.name} {user.lastName}
                            </p>
                            <p
                              className="mt-1 truncate text-xs font-medium leading-5 text-gray-400"
                              style={{ width: "200px" }}
                            >
                              {user.email}
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
