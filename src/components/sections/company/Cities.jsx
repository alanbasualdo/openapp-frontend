import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useCitySectionStore } from "../../../hooks/CompanySections/useCitySectionStore";
import { useGeoApiStore } from "../../../hooks/useGeoApiStore";

export const Cities = ({ setBtnActivated }) => {
  const { startPostCity, startGetCities, startDeleteCity } =
    useCitySectionStore();
  const { getProvincias, getLocalidades } = useGeoApiStore();
  const { cities, loading } = useSelector((state) => state.companySection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.province.toLowerCase().includes(search.toLowerCase())
  );

  const cityInitialState = {
    name: "",
    province: "",
  };

  const [city, setCity] = useState(cityInitialState);

  const postCity = async (city) => {
    try {
      const data = await startPostCity(city);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setCity(cityInitialState);
        startGetCities();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteCity = async (city) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteCity(city._id);
        if (data.success) {
          startGetCities();
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
    startGetCities();
  }, []);

  useEffect(() => {
    const fetchProvincias = async () => {
      const provinciasData = await getProvincias();
      setProvincias(provinciasData);
    };
    fetchProvincias();
  }, []);

  useEffect(() => {
    const fetchLocalidades = async () => {
      const localidadesData = await getLocalidades(city.province);
      setLocalidades(localidadesData);
    };
    fetchLocalidades();
  }, [city.province]);

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
            <h1 className="font-medium">Agregar ciudad</h1>
          ) : (
            <h1 className="font-medium">Ciudades</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setCity(cityInitialState);
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
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3 text-light"
            value={city.province}
            onChange={(e) => setCity({ ...city, province: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar provincia
            </option>
            {provincias.map((provincia, i) => (
              <option value={provincia.nombre} key={provincia.i}>
                {provincia.nombre}
              </option>
            ))}
          </select>
          <select
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3 text-light"
            value={city.name}
            onChange={(e) => setCity({ ...city, name: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar ciudad
            </option>
            {localidades?.map((localidad) => (
              <option value={localidad.nombre} key={localidad.i}>
                {localidad.nombre}
              </option>
            ))}
          </select>
          <button
            className="btn btn-sm btn-success"
            onClick={() => postCity(city)}
            disabled={!city.province || !city.name}
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
                </tr>
              </thead>
              <tbody>
                {filteredCities.map((city) => (
                  <tr
                    key={city._id}
                    className="cursor-pointer"
                    onClick={() => deleteCity(city)}
                  >
                    <td>{city.name}</td>
                    <td>{city.province}</td>
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
