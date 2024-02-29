import { useEffect, useState } from "react";
import { useCompanySectionStore } from "../../../hooks/useCompanySectionStore";
import { useSelector } from "react-redux";

export const Companies = ({ setBtnActivated }) => {
  const { startPostCompany, startGetCompanies, startDeleteCompany } =
    useCompanySectionStore();
  const { companies, loading } = useSelector((state) => state.companySection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const companyInitialState = {
    cuit: "",
    name: "",
  };

  const [company, setCompany] = useState(companyInitialState);

  const postCompany = (company) => {
    startPostCompany(company);
    setAddBtn(false);
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
      <div className="row d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-3 rounded-xl">
          <button
            onClick={() => setBtnActivated(false)}
            title="Volver"
            className="px-2"
          >
            <i className="ri-arrow-left-circle-line text-2xl text-danger"></i>
          </button>
        </div>
        <div className="col-6">
          {addBtn ? (
            <h1 className="font-medium">Agregar compañía</h1>
          ) : (
            <h1 className="font-medium">Compañías</h1>
          )}
        </div>
        <div className="col-3 rounded-xl">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setCompany(companyInitialState);
              }}
              title="Cancelar"
              className="px-2"
            >
              <i className="ri-close-circle-line text-2xl text-danger"></i>
            </button>
          ) : (
            <button
              onClick={() => setAddBtn(true)}
              title="Agregar"
              className="px-2"
            >
              <i className="ri-add-circle-line text-2xl text-success"></i>
            </button>
          )}
        </div>
      </div>
      <hr className="my-2" />
      {addBtn ? (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-3">
            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                placeholder="CUIT"
                value={company.cuit}
                onChange={(e) =>
                  setCompany({ ...company, cuit: e.target.value })
                }
              />
              <label className="text-secondary">CUIT</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                value={company.name}
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
              />
              <label className="text-secondary">Nombre</label>
            </div>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={() => postCompany(company)}
            disabled={!company.cuit || !company.name}
          >
            Guardar
          </button>
        </>
      ) : (
        <div>
          <div className="input-group input-group-sm my-3">
            <input
              type="text"
              className="border-none outline-none bg-transparent focus:ring-0 w-full text-center"
              placeholder="Buscar compañía"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          ) : (
            <div className="bg-dark p-1 rounded-xl">
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    <th scope="col">CUIT</th>
                    <th scope="col">Compañía</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
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
            </div>
          )}
        </div>
      )}
    </>
  );
};
