import { useState } from "react";

export const Brands = ({ setBtnActivated }) => {
  const [brand, setBrand] = useState({
    company: "",
    name: "",
  });

  console.log(brand);

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Marcas
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-2">
        <span className="input-group-text font-semibold">Compañía</span>
        <select
          className="form-select"
          value={brand.company}
          onChange={(e) => setBrand({ ...brand, company: e.target.value })}
        >
          <option value="" disabled>
            Seleccionar compañía
          </option>
          <option value="Fortecar">Fortecar</option>
          <option value="Granville">Granville</option>
          <option value="Pampawagen">Pampawagen</option>
          <option value="Opencars">Opencars</option>
        </select>
        <span className="input-group-text font-semibold">Marca</span>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la marca"
          value={brand.name}
          onChange={(e) => setBrand({ ...brand, name: e.target.value })}
        />
        <button className="btn btn-sm btn-success">Guardar</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Compañía</th>
            <th scope="col">Marca</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cursor-pointer">
            <td>asd</td>
            <td>asd</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
