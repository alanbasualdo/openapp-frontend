import { useState } from "react";

export const Cities = ({ setBtnActivated }) => {
  const [city, setCity] = useState({
    name: "",
    province: "",
  });

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Ciudades
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-2">
        <span className="input-group-text font-semibold">Ciudad</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la ciudad"
          value={city.name}
          onChange={(e) => setCity({ ...city, name: e.target.value })}
        />
        <span className="input-group-text font-semibold">Provincia</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la provincia"
          value={city.province}
          onChange={(e) => setCity({ ...city, province: e.target.value })}
        />
        <button className="btn btn-sm btn-success">Guardar</button>
      </div>
      <div className="bg-dark p-1 rounded-lg">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Ciudad</th>
              <th scope="col">Provincia</th>
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
