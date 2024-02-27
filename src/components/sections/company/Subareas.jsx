import { useState } from "react";

export const Subareas = ({ setBtnActivated }) => {
  const [subarea, setSubarea] = useState({
    area: "",
    name: "",
  });

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Subáreas
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-2">
        <span className="input-group-text font-semibold">Área</span>
        <select
          className="form-select"
          value={subarea.area}
          onChange={(e) => setSubarea({ ...subarea, area: e.target.value })}
        >
          <option value="" disabled>
            Seleccionar área
          </option>
          <option value="Fortecar">Fortecar</option>
          <option value="Granville">Granville</option>
          <option value="Pampawagen">Pampawagen</option>
          <option value="Opencars">Opencars</option>
        </select>
        <span className="input-group-text font-semibold">Subárea</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la subárea"
          value={subarea.name}
          onChange={(e) => setSubarea({ ...subarea, name: e.target.value })}
        />
        <button className="btn btn-sm btn-success">Guardar</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Área</th>
            <th scope="col">Subárea</th>
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
    </>
  );
};
