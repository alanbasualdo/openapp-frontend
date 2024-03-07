import { useEffect, useState } from "react";
import { useCompanySectionStore } from "../../../hooks/CompanySections/useCompanySectionStore";
import { useBrandSectionStore } from "../../../hooks/CompanySections/useBrandSectionStore";
import { useCitySectionStore } from "../../../hooks/CompanySections/useCitySectionStore";
import { useBranchSectionStore } from "../../../hooks/CompanySections/useBranchSectionStore";
import { useSelector } from "react-redux";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";

export const Branches = ({ setBtnActivated }) => {
  const { startGetCompanies } = useCompanySectionStore();
  const { startGetBrands } = useBrandSectionStore();
  const { startGetCities } = useCitySectionStore();
  const { startPostBrach, startGetBranches, startDeleteBranch } =
    useBranchSectionStore();
  const { companies, brands, cities, branches, loading } = useSelector(
    (state) => state.companySection
  );
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredBranches = branches.filter(
    (branch) =>
      branch.city.toLowerCase().includes(search.toLowerCase()) ||
      branch.province.toLowerCase().includes(search.toLowerCase()) ||
      branch.brand.toLowerCase().includes(search.toLowerCase()) ||
      branch.company.toLowerCase().includes(search.toLowerCase())
  );

  const branchInitialState = {
    city: "",
    province: "",
    brand: "",
    company: "",
  };

  const [branch, setBranch] = useState(branchInitialState);

  const postBranch = async (branch) => {
    try {
      const data = await startPostBrach(branch);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setBranch(branchInitialState);
        startGetBranches();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteBranch = async (branch) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteBranch(branch._id);
        if (data.success) {
          startGetBranches();
          showSuccessMessage(data.message);
        } else {
          showErrorMessage(data.message);
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    startGetBranches();
  }, []);

  useEffect(() => {
    if (addBtn) {
      startGetCompanies();
      startGetBrands();
      startGetCities();
    }
  }, [addBtn]);

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
            <h1 className="font-medium">Agregar sucursal</h1>
          ) : (
            <h1 className="font-medium">Sucursales</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setBranch(branchInitialState);
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
          <select
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            value={branch.city}
            onChange={(e) => {
              const selectedCityName = e.target.value;
              const selectedCity = cities.find(
                (city) => city.name === selectedCityName
              );
              setBranch({
                ...branch,
                city: selectedCityName,
                province: selectedCity ? selectedCity.province : "",
              });
            }}
          >
            <option value="" disabled>
              Seleccionar ubicación
            </option>
            {cities.map((city) => (
              <option value={city.name} key={city._id}>
                {city.name} - {city.province}
              </option>
            ))}
          </select>
          <select
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            value={branch.brand}
            onChange={(e) => {
              const selectedBrand = brands.find(
                (brand) => brand.name === e.target.value
              );
              setBranch({
                ...branch,
                brand: selectedBrand ? selectedBrand.name : "",
                company: selectedBrand ? selectedBrand.company : "",
              });
            }}
          >
            <option value="" disabled>
              Seleccionar marca
            </option>
            {brands.map((brand) => (
              <option value={brand.name} key={brand._id}>
                {brand.name} - {brand.company}
              </option>
            ))}
          </select>
          <button
            className="btn btn-sm btn-success"
            onClick={() => postBranch(branch)}
            disabled={
              !branch.city ||
              !branch.province ||
              !branch.brand ||
              !branch.company
            }
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              "Guardar"
            )}
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
                  <th scope="col">Ciudad</th>
                  <th scope="col">Provincia</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Compañía</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr
                    key={branch._id}
                    className="cursor-pointer"
                    onClick={() => deleteBranch(branch)}
                  >
                    <td>{branch.city}</td>
                    <td>{branch.province}</td>
                    <td>{branch.brand}</td>
                    <td>{branch.company}</td>
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
