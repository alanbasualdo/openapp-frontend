import { useState } from "react";
import { useSelector } from "react-redux";

export const Brands = ({ setBtnActivated }) => {
  const { companies } = useSelector((state) => state.companySection);

  const [brand, setBrand] = useState({
    company: "",
    name: "",
  });

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
          {companies.map((company) => (
            <option value={company.name} key={company._id}>
              {company.name}
            </option>
          ))}
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
      <div className="bg-dark p-1 rounded-xl">
        <table className="table table-hover table-dark">
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
      </div>
    </>
  );
};
