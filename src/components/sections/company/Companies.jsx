import { useState } from "react";

export const Companies = ({ setBtnActivated }) => {
  const [company, setCompany] = useState({
    cuit: "",
    name: "",
  });

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Compañías
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-2">
        <span className="input-group-text font-semibold">CUIT</span>
        <input
          type="text"
          className="form-control"
          placeholder="CUIT de la compañía"
          value={company.cuit}
          onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
        />
        <span className="input-group-text font-semibold">Compañía</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la compañía"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <button className="btn btn-sm btn-success">Guardar</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">CUIT</th>
            <th scope="col">Compañía</th>
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
