import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useAreaSectionStore } from "../../../hooks/CompanySections/useAreaSectionStore";

export const Areas = ({ setBtnActivated }) => {
  const { startPostArea, startGetAreas, startDeleteArea } =
    useAreaSectionStore();
  const { areas, loading } = useSelector((state) => state.companySection);

  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(search.toLowerCase())
  );

  const areaInitialState = { name: "" };

  const [area, setArea] = useState(areaInitialState);

  const postArea = async (area) => {
    try {
      const data = await startPostArea(area);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setArea(areaInitialState);
        startGetAreas();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteArea = async (area) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteArea(area._id);
        if (data.success) {
          startGetAreas();
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
    startGetAreas();
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
            <h1 className="font-medium">Agregar área</h1>
          ) : (
            <h1 className="font-medium">Áreas</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setArea(areaInitialState);
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
            type="text"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Área"
            value={area.name}
            onChange={(e) => setArea({ ...area, name: e.target.value })}
            autoFocus
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postArea(area)}
            disabled={!area.name}
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
                  <th scope="col">Área</th>
                </tr>
              </thead>
              <tbody>
                {filteredAreas.map((area) => (
                  <tr
                    key={area._id}
                    className="cursor-pointer"
                    onClick={() => deleteArea(area)}
                  >
                    <td>{area.name}</td>
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
