import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import {
  showSuccessMessage,
  showErrorMessage,
  showConfirmDialog,
} from "../../utils/showMessages";

export const TicketsArea = ({ setBtnActivated }) => {
  const { startGetAreas, startPutArea } = useAreaSectionStore();
  const { areas, loading } = useSelector((state) => state.companySection);

  const [search, setSearch] = useState("");
  const [localAreas, setLocalAreas] = useState([]);

  useEffect(() => {
    startGetAreas();
  }, []);

  useEffect(() => {
    setLocalAreas(areas);
  }, [areas]);

  const filteredAreas = localAreas.filter((area) =>
    area.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckboxChange = (areaId) => {
    setLocalAreas((prevAreas) =>
      prevAreas.map((area) =>
        area._id === areaId ? { ...area, haveTickets: !area.haveTickets } : area
      )
    );
  };

  const putArea = async (area) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startPutArea(area);
        if (data.success) {
          showSuccessMessage(data.message);
          startGetAreas();
        } else {
          showErrorMessage(data.message);
        }
      } catch (error) {
        showErrorMessage(
          error.response?.data?.message || "Error en la solicitud"
        );
      }
    }
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
          <h1 className="font-medium">Tickets áreas</h1>
        </div>
        <div className="col-3 rounded-lg">
          <button
            onClick={() => localAreas.forEach((area) => putArea(area))}
            title="Guardar"
            className="px-2"
          >
            <i className="ri-checkbox-circle-fill text-3xl text-success"></i>
          </button>
        </div>
      </div>
      <hr />
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
                  <th scope="col">Área</th>
                  <th scope="col">Tickets</th>
                </tr>
              </thead>
              <tbody>
                {filteredAreas.map((area) => (
                  <tr key={area._id} className="cursor-pointer">
                    <td>{area.name}</td>
                    <td>
                      <div className="form-check form-switch flex items-center justify-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckDefault-${area._id}`}
                          checked={area.haveTickets}
                          onChange={() => handleCheckboxChange(area._id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexSwitchCheckDefault-${area._id}`}
                        ></label>
                      </div>
                    </td>
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
