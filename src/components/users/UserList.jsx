import { useState } from "react";
import { useSelector } from "react-redux";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils/showMessages";
import Swal from "sweetalert2";

export const UserList = ({ setSelectedUser, startPutPassword }) => {
  const [search, setSearch] = useState("");
  const { users, totalUsers } = useSelector((state) => state.user);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.userName.toLowerCase().includes(search.toLowerCase())
  );

  const putPassword = async (userID) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      Swal.fire({
        title: "Nueva contraseña",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "custom-swal", // Aplica la clase personalizada
          confirmButton: "swal2-confirm",
          cancelButton: "swal2-cancel",
        },
        showLoaderOnConfirm: true,
        preConfirm: async (newPassword) => {
          try {
            const data = await startPutPassword(userID, newPassword);
            if (data.success) {
              showSuccessMessage(data.message);
            } else {
              showErrorMessage(data.message);
            }
          } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
          }
        },
      });
    }
  };

  return (
    <>
      <h1 className="mb-1 font-semibold">Lista de usuarios</h1>
      <p className="text-gray-400 mb-3 text-xs font-semibold">
        Total: {totalUsers}
      </p>
      <div className="row mx-auto justify-content-center mb-3">
        <div className="col-md-4 d-flex align-items-center justify-content-center font-medium">
          <input
            name="search-user-input"
            type="text"
            className="border-none outline-none bg-transparent focus:ring-0 w-full text-center"
            placeholder="Buscar usuario"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <div
            className="col-md-1 d-flex align-items-center justify-content-center"
            onClick={() => setSearch("")}
            title="Borrar"
          >
            <i className="ri-close-fill cursor-pointer text-gray-400 hover:text-red-400 font-bold text-xs"></i>
          </div>
        )}
      </div>
      <div className="bg-dark p-1 rounded-lg " style={{ overflowX: "auto" }}>
        <table className="table table-hover table-dark text-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Usuario</th>
              <th scope="col">Sucursal</th>
              <th scope="col">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>
                  {user.branch?.company} {user.branch?.city}
                </td>
                <th scope="col">
                  <i
                    className="ri-pencil-fill text-opencars cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el evento se propague al tr
                      putPassword(user._id);
                    }}
                  ></i>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
