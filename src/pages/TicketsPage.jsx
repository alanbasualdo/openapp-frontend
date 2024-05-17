import { useState } from "react";

export const TicketsPage = () => {
  const [btnActivated, setBtnActivated] = useState(false);
  const [section, setSection] = useState("");

  const activeBtn = () => {
    setBtnActivated(true);
  };

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
            className="input-none bg-dark  rounded-lg py-1 px-3"
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
            className="input-none bg-dark  rounded-lg py-1 px-3"
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
          <div className="rounded-lg py-2 px-3 bg-dark d-flex ">
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
          <div className="bg-dark p-1 rounded-lg ">
            <table className="table table-hover table-dark text-sm">
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
