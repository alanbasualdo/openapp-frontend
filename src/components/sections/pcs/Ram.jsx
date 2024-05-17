import { useSelector } from "react-redux";
import { useRamSectionStore } from "../../../hooks/PCs/useRamSectionStore";
import { useEffect, useState } from "react";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";

export const Ram = ({ setBtnActivated }) => {
  const { startPostRam, startGetRams, startDeleteRam } = useRamSectionStore();
  const { pcsLoading, rams } = useSelector((state) => state.pcsSection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredRams = rams.filter(
    (ram) =>
      ram.brand.toLowerCase().includes(search.toLowerCase()) ||
      ram.model.toLowerCase().includes(search.toLowerCase())
  );

  const ramsInitialState = {
    brand: "",
    model: "",
    ddr: "",
    speed: "",
    volume: "",
  };

  const [ram, setRam] = useState(ramsInitialState);

  const postRam = async (ram) => {
    try {
      const data = await startPostRam(ram);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setRam(ramsInitialState);
        startGetRams();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteRam = async (ram) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteRam(ram._id);
        if (data.success) {
          startGetRams();
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
    startGetRams();
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
            <h1 className="font-medium">Agregar memoria ram</h1>
          ) : (
            <h1 className="font-medium">Memorias ram</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setRam(ramsInitialState);
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
          {/* BRAND */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={ram.brand}
            onChange={(e) => setRam({ ...ram, brand: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar marca
            </option>
            <option value="ADATA">ADATA</option>
            <option value="Corsair">Corsair</option>
            <option value="Crucial">Crucial</option>
            <option value="G.Skill">G.Skill</option>
            <option value="HyperX">HyperX</option>
            <option value="Kingston">Kingston</option>
            <option value="Patriot">Patriot</option>
            <option value="Samsung">Samsung</option>
            <option value="TeamGroup">TeamGroup</option>
            <option value="Transcend">Transcend</option>
          </select>
          {/* MODEL */}
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Modelo"
            value={ram.model}
            onChange={(e) => setRam({ ...ram, model: e.target.value })}
          />
          {/* DDR */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={ram.ddr}
            onChange={(e) => setRam({ ...ram, ddr: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar DDR
            </option>
            <option value="DDR1">DDR1</option>
            <option value="DDR2">DDR2</option>
            <option value="DDR3">DDR3</option>
            <option value="DDR4">DDR4</option>
            <option value="DDR5">DDR5</option>
            <option value="DDR6">DDR6</option>
          </select>
          {/* SPEED */}
          <input
            type="number"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Velocidad MHz"
            value={ram.speed}
            onChange={(e) => setRam({ ...ram, speed: e.target.value })}
          />
          {/* VOLUME */}
          <input
            type="number"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Capacidad GB"
            value={ram.volume}
            onChange={(e) => setRam({ ...ram, volume: e.target.value })}
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postRam(ram)}
            disabled={
              !ram.brand || !ram.model || !ram.ddr || !ram.speed || !ram.volume
            }
          >
            {pcsLoading ? (
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
        {pcsLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          <div className="bg-dark p-1 rounded-lg ">
            <table className="table table-hover table-dark text-sm">
              <thead>
                <tr>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">DDR</th>
                  <th scope="col">Velocidad</th>
                  <th scope="col">Capacidad</th>
                </tr>
              </thead>
              <tbody>
                {filteredRams.map((ram) => (
                  <tr
                    key={ram._id}
                    className="cursor-pointer"
                    onClick={() => deleteRam(ram)}
                  >
                    <td>{ram.brand}</td>
                    <td>{ram.model}</td>
                    <td>{ram.ddr}</td>
                    <td>{ram.speed} MHz</td>
                    <td>{ram.volume} GB</td>
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
