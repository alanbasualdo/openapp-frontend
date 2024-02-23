import { useState } from "react";
import { useSelector } from "react-redux";

export const UserList = () => {
  const [search, setSearch] = useState("");
  const { users, totalUsers } = useSelector((state) => state.user);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-dark mb-1 font-semibold">Lista de usuarios</h1>
      <p className="text-gray-500 mb-3 text-sm font-semibold">
        Total: {totalUsers}
      </p>
      <div className="row mx-auto justify-content-center mb-3">
        <div className="col-md-4 d-flex align-items-center justify-content-center font-semibold text-md bg-gray-50 text-gray-400 rounded-lg">
          <input
            type="text"
            className="border-none outline-none focus:ring-0"
            placeholder="Buscar usuario"
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
          {filteredUsers.map((user) => (
            <tr key={user._id} className="cursor-pointer">
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.userName}</td>
              <td>{user.city}</td>
              <td>{user.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
