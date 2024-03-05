import { useState } from "react";

export const Areas = ({ setBtnActivated }) => {
  const [area, setArea] = useState({
    name: "",
  });

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Áreas
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-2">
        <span className="input-group-text font-semibold">Área</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del área"
          value={area.name}
          onChange={(e) => setArea({ ...area, name: e.target.value })}
        />
        <button className="btn btn-sm btn-success">Guardar</button>
      </div>
      <div className="bg-dark p-1 rounded-lg">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Área</th>
            </tr>
          </thead>
          {/* <tbody>
        {filteredUsers.map((user) => (
        <tr key={user._id} className="cursor-pointer">
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.userName}</td>
            <td>{user.city}</td>
            <td>{user.branch}</td>
        </tr>
        ))}
        </tbody> */}
        </table>
      </div>
    </>
  );
};
