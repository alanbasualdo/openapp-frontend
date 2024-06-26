import { useEffect, useState } from "react";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useSelector } from "react-redux";
import { usePositionSectionStore } from "../../../hooks/PositionsSections/usePositionSectionStore";

export const Positions = ({ setBtnActivated }) => {
  const {
    startPostPosition,
    startGetPositions,
    startDeletePosition,
    startPutPosition,
  } = usePositionSectionStore();
  const { positions, loading } = useSelector((state) => state.companySection);

  const [editingPositionId, setEditingPositionId] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);

  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredPositions = positions.filter((position) =>
    position.name.toLowerCase().includes(search.toLowerCase())
  );

  const positionInitialState = {
    name: "",
    level: 0,
  };

  const [position, setPosition] = useState(positionInitialState);

  const postPosition = async (position) => {
    try {
      const data = await startPostPosition(position);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setPosition(positionInitialState);
        startGetPositions();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deletePosition = async (position) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeletePosition(position._id);
        if (data.success) {
          startGetPositions();
          showSuccessMessage(data.message);
        } else {
          showErrorMessage(data.message);
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    }
  };

  const putPosition = async () => {
    if (!editingPosition) return;
    try {
      const data = await startPutPosition(editingPosition);
      if (data.success) {
        startGetPositions();
        showSuccessMessage(data.message);
        setEditingPosition(null);
        setEditingPositionId(null);
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    startGetPositions();
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
            <h1 className="font-medium">Agregar puesto</h1>
          ) : (
            <h1 className="font-medium">Puestos</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setPosition(positionInitialState);
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
            value={position.level}
            onChange={(e) =>
              setPosition({ ...position, level: e.target.value })
            }
          >
            <option value="" disabled>
              Seleccionar nivel
            </option>
            {[...Array(50).keys()].map((num) => (
              <option value={num + 1} key={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Puesto"
            value={position.name}
            onChange={(e) => setPosition({ ...position, name: e.target.value })}
            autoFocus
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postPosition(position)}
            disabled={!position.name || !position.level}
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
                  <th scope="col">Editar</th>
                  <th scope="col">Nivel</th>
                  <th scope="col">Puesto</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredPositions.map((position) => (
                  <tr key={position._id}>
                    <td>
                      {editingPositionId === position._id ? (
                        <>
                          <i
                            className="ri-close-line text-danger text-xl cursor-pointer"
                            onClick={() => setEditingPositionId(null)}
                          ></i>
                          <i
                            className="ri-check-line text-success text-xl ml-2 cursor-pointer"
                            onClick={putPosition}
                          ></i>
                        </>
                      ) : (
                        <i
                          className="ri-pencil-fill text-opencars cursor-pointer"
                          onClick={() => {
                            setEditingPositionId(position._id);
                            setEditingPosition({ ...position });
                          }}
                        ></i>
                      )}
                    </td>
                    {editingPositionId === position._id ? (
                      <td>
                        <input
                          type="number"
                          className="input-none bg-dark  rounded-lg text-center"
                          placeholder="Puesto"
                          value={editingPosition?.level}
                          onChange={(e) =>
                            setEditingPosition({
                              ...editingPosition,
                              level: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </td>
                    ) : (
                      <td>{position.level}</td>
                    )}
                    <td>{position.name}</td>
                    <td>
                      <i
                        className="ri-delete-bin-line text-danger cursor-pointer"
                        onClick={() => deletePosition(position)}
                      ></i>
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
