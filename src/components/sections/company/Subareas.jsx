import { useEffect, useState } from "react";
import { useSubareaSectionStore } from "../../../hooks/CompanySections/useSubareaSectionStore";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useAreaSectionStore } from "../../../hooks/CompanySections/useAreaSectionStore";
import { useSelector } from "react-redux";

export const Subareas = ({ setBtnActivated }) => {
  const { startPostSubarea, startGetSubareas, startDeleteSubarea } =
    useSubareaSectionStore();
  const { startGetAreas } = useAreaSectionStore();
  const { areas, subareas, loading } = useSelector(
    (state) => state.companySection
  );

  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredSubareas = subareas.filter(
    (subarea) =>
      subarea.name.toLowerCase().includes(search.toLowerCase()) ||
      subarea.area.toLowerCase().includes(search.toLowerCase())
  );

  const subareaInitialState = {
    area: "",
    name: "",
  };

  const [subarea, setSubarea] = useState(subareaInitialState);

  const postSubarea = async (subarea) => {
    try {
      const data = await startPostSubarea(subarea);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setSubarea(subareaInitialState);
        startGetSubareas();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteSubarea = async (area) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteSubarea(area._id);
        if (data.success) {
          startGetSubareas();
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
    if (addBtn) {
      startGetAreas();
    }
  }, [addBtn]);

  useEffect(() => {
    startGetSubareas();
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
            <h1 className="font-medium">Agregar subárea</h1>
          ) : (
            <h1 className="font-medium">Subáreas</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setSubarea(subareaInitialState);
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
            value={subarea.area}
            onChange={(e) => setSubarea({ ...subarea, area: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar área
            </option>
            {areas.map((area) => (
              <option value={area.name} key={area._id}>
                {area.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Área"
            value={subarea.name}
            onChange={(e) => setSubarea({ ...subarea, name: e.target.value })}
            autoFocus
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postSubarea(subarea)}
            disabled={!subarea.name || !subarea.area}
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
                  <th scope="col">Subárea</th>
                  <th scope="col">Área</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubareas.map((subarea) => (
                  <tr
                    key={subarea._id}
                    className="cursor-pointer"
                    onClick={() => deleteSubarea(subarea)}
                  >
                    {" "}
                    <td>{subarea.name}</td>
                    <td>{subarea.area}</td>
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
