import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useBrandSectionStore } from "../../../hooks/CompanySections/useBrandSectionStore";
import { useCompanySectionStore } from "../../../hooks/CompanySections/useCompanySectionStore";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";

export const Brands = ({ setBtnActivated }) => {
  const { startGetCompanies } = useCompanySectionStore();
  const { startPostBrand, startGetBrands, startDeleteBrand } =
    useBrandSectionStore();
  const { companies, brands, loading } = useSelector(
    (state) => state.companySection
  );
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase()) ||
      brand.company.toLowerCase().includes(search.toLowerCase())
  );

  const brandInitialState = {
    company: "",
    name: "",
  };

  const [brand, setBrand] = useState(brandInitialState);

  const postBrand = async (brand) => {
    try {
      const data = await startPostBrand(brand);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setBrand(brandInitialState);
        startGetBrands();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteBrand = async (brand) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteBrand(brand._id);
        if (data.success) {
          startGetBrands();
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
    startGetBrands();
  }, []);

  useEffect(() => {
    if (addBtn) {
      startGetCompanies();
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
            <h1 className="font-medium">Agregar marca</h1>
          ) : (
            <h1 className="font-medium">Marcas</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setBrand(brandInitialState);
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
          <input
            type="text"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Marca"
            value={brand.name}
            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postBrand(brand)}
            disabled={!brand.company || !brand.name}
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
                  <th scope="col">Compañía</th>
                  <th scope="col">Marca</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="cursor-pointer"
                    onClick={() => deleteBrand(brand)}
                  >
                    <td>{brand.company}</td>
                    <td>{brand.name}</td>
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
