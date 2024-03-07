import { useEffect, useState } from "react";
import { useCompanySectionStore } from "../../../hooks/CompanySections/useCompanySectionStore";
import { useSelector } from "react-redux";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";

export const Companies = ({ setBtnActivated }) => {
  const { startPostCompany, startGetCompanies, startDeleteCompany } =
    useCompanySectionStore();
  const { companies, loading } = useSelector((state) => state.companySection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.cuit.toString().includes(search)
  );

  const companyInitialState = {
    cuit: "",
    name: "",
  };

  const [company, setCompany] = useState(companyInitialState);

  const postCompany = async (company) => {
    try {
      const data = await startPostCompany(company);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setCompany(companyInitialState);
        startGetCompanies();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteCompany = async (company) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteCompany(company._id);
        if (data.success) {
          startGetCompanies();
          showErrorMessage(data.message);
        } else {
          showErrorMessage(data.message);
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    startGetCompanies();
  }, []);

  return (
    <>
      <div className="row d-flex flex-wrap justify-content-center align-items-center mb-2">
        <div className="col-3 rounded-lg">
          <button
            onClick={() => setBtnActivated(false)}
            title="Volver"
            className="px-2"
          >
            <i className="ri-arrow-left-circle-line text-3xl text-danger"></i>
          </button>
        </div>
        <div className="col-6">
          {addBtn ? (
            <h1 className="font-medium">Agregar compañía</h1>
          ) : (
            <h1 className="font-medium">Compañías</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setCompany(companyInitialState);
              }}
              title="Cancelar"
              className="px-2"
            >
              <i className="ri-close-circle-line text-3xl text-danger"></i>
            </button>
          ) : (
            <button
              onClick={() => setAddBtn(true)}
              title="Agregar"
              className="px-2"
            >
              <i className="ri-add-circle-line text-3xl text-success"></i>
            </button>
          )}
        </div>
      </div>
      <hr />
      {addBtn && (
        <div className="my-4 d-flex flex-wrap gap-2 justify-content-center">
          <input
            type="number"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="CUIT"
            value={company.cuit}
            onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
            autoFocus
          />
          <input
            type="text"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Compañía"
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
      )}
      <div>
        <div className="input-group input-group-sm my-3 d-flex flex-col align-items-center">
          <div className="rounded-lg py-2 px-3 bg-dark d-flex black-shadow">
            <input
              type="text"
              className="border-none outline-none bg-transparent focus:ring-0 text-center w-48"
              placeholder="Buscar"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <i
                className="ri-close-circle-line ml-2 text-danger cursor-pointer"
                onClick={() => setSearch("")}
              ></i>
            )}
          </div>
        </div>
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          <div className="bg-dark p-1 rounded-lg black-shadow">
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
                    onClick={() => deleteCompany(company)}
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
    </>
  );
};
