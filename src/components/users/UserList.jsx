import { useState } from "react";

export const UserList = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-dark mb-3 font-semibold">Lista de colaboradores</h1>
      <div className="row mx-auto justify-content-center mb-3">
        <div className="col-md-4 d-flex align-items-center justify-content-center font-semibold text-md text-gray-400">
          <input
            type="text"
            className="border-none outline-none focus:ring-0"
            placeholder="Buscar colaborador"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          className="col-md-1 d-flex align-items-center justify-content-center"
          onClick={() => setSearch("")}
          title="Borrar"
        >
          <i className="ri-close-fill cursor-pointer text-gray-400 hover:text-red-400 font-bold text-md"></i>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Usuario</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alan</td>
            <td>Basualdo</td>
            <td>abasualdo</td>
            <td>Junín</td>
            <td>Fortecar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
