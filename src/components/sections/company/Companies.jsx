import { useEffect, useState } from "react";
import { useCompanySectionStore } from "../../../hooks/useCompanySectionStore";
import { useSelector } from "react-redux";

export const Companies = ({ setBtnActivated }) => {
  const { startPostCompany, startGetCompanies, startDeleteCompany } =
    useCompanySectionStore();
  const { companies, loading } = useSelector((state) => state.companySection);

  const companyInitialState = {
    cuit: "",
    name: "",
  };

  const [company, setCompany] = useState(companyInitialState);

  const postCompany = (company) => {
    startPostCompany(company);
    setCompany(companyInitialState);
  };

  const deleteCompany = (companyID) => {
    startDeleteCompany(companyID);
  };

  useEffect(() => {
    startGetCompanies();
  }, []);

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Compañías
      </h1>
      <hr className="mb-2" />
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text font-semibold">CUIT</span>
        <input
          type="number"
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
        <button
          className="btn btn-sm btn-success"
          onClick={() => postCompany(company)}
          disabled={!company.cuit || !company.name}
        >
          Guardar
        </button>
      </div>
      {loading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">CUIT</th>
              <th scope="col">Compañía</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                className="cursor-pointer"
                onClick={() => deleteCompany(company._id)}
              >
                <td>{company.cuit}</td>
                <td>{company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
