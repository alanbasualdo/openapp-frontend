import { useState } from "react";

export const RightSidebar = ({ showRightbar }) => {
  const listaUsuarios = [
    { id: 1, username: "usuario1", nombre: "Nombre Usuario 1" },
    { id: 2, username: "usuario2", nombre: "Nombre Usuario 2" },
    { id: 3, username: "usuario3", nombre: "Nombre Usuario 3" },
    { id: 4, username: "usuario4", nombre: "Nombre Usuario 4" },
    { id: 5, username: "usuario5", nombre: "Nombre Usuario 5" },
  ];

  return (
    <>
      {showRightbar && (
        <div
          className="offcanvas-end show bg-blue-600 relative w-50"
          style={{ height: "calc(100vh - 40px)" }}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="p-3 mt-2">
            <div className="offcanvas-header">
              <div className="text-center">
                <img src="..." className="rounded-xl" alt="..." />
              </div>
            </div>
            {/* Start search bar */}
            <div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                />
                <button className="btn btn-sm btn-outline-light" type="button">
                  Buscar
                </button>
              </div>
            </div>
            {/* End search bar */}
            <div className="offcanvas-body text-white">
              <ul>
                {listaUsuarios.map((usuario) => (
                  <li
                    className="bg-gray-50 p-2 rounded-xl text-gray-700 mb-1 hover:bg-gray-200 cursor-pointer h-9 text-sm font-medium"
                    key={usuario.id}
                  >
                    {usuario.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
