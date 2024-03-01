import { useEffect, useState } from "react";
import { useCompanySectionStore } from "../../../hooks/useCompanySectionStore";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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

  const deleteCompany = (company) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Usted no podrá revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeleteCompany(company);
        Swal.fire({
          title: "Eliminado!",
          text: "Ha sido eliminado correctamente",
          icon: "success",
        });
      }
    });
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
      {addBtn && (
        <>
          <div className="input-group input-group-sm my-3">
            <span className="input-group-text font-medium">CUIT</span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={company.cuit}
              onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
            />
            <span className="input-group-text font-medium">Nombre</span>
            <input
              type="text"
              className="form-control"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
            />
          </div>
          <button
            className="btn btn-sm btn-success"
            onClick={() => postCompany(company)}
            disabled={!company.cuit || !company.name}
          >
            Guardar
          </button>
        </>
      )}
      <div>
        <div className="input-group input-group-sm my-3 d-flex flex-col align-items-center">
          <div
            className="rounded-xl py-2 px-3 bg-dark d-flex"
            style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.8)" }}
          >
            <input
              type="text"
              className="border-none outline-none bg-transparent focus:ring-0 text-center w-48"
              placeholder="Buscar compañía"
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
