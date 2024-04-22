import React from "react";
import { useMemoriesSectionStore } from "../../../hooks/PCs/useMemoriesSectionStore";
import { setMemories } from "../../../store/slices/pcsSectionSlice";

export const Memories = () => {
  const { startPostMemorie, startGetMemories, startDeleteMemorie } =
    useMemoriesSectionStore();
  const { pcsLoading, memories } = useSelector((state) => state.pcsSection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredMemories = memories.filter(
    (memorie) =>
      memorie.brand.toLowerCase().includes(search.toLowerCase()) ||
      memorie.model.toLowerCase().includes(search.toLowerCase())
  );

  const memoriesInitialState = {
    brand: "",
    model: "",
    ddr: "",
    speed: "",
    volume: "",
  };

  const [memorie, setMemorie] = useState(memoriesInitialState);

  const postMemorie = async (memorie) => {
    try {
      const data = await startPostMemorie(memorie);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setMemories(memoriesInitialState);
        startGetMemories();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteMemorie = async (memorie) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteMemorie(memorie._id);
        if (data.success) {
          startGetMemories();
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
    startGetMemories();
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
                setMemorie(memoriesInitialState);
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
            value={processor.brand}
            onChange={(e) =>
              setProcessor({ ...processor, brand: e.target.value })
            }
          >
            <option value="" disabled>
              Seleccionar marca
            </option>
            <option value="AMD">AMD</option>
            <option value="Apple">Apple</option>
            <option value="IBM">IBM</option>
            <option value="Intel">Intel</option>
            <option value="MediaTek">MediaTek</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="Qualcomm">Qualcomm</option>
            <option value="Samsung">Samsung</option>
          </select>
          <select
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3 text-light"
            value={processor.graph}
            onChange={(e) =>
              setProcessor({ ...processor, graph: e.target.value })
            }
          >
            <option value="" disabled>
              ¿Tiene gráfica integrada?
            </option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
          <select
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3 text-light"
            value={processor.cores}
            onChange={(e) =>
              setProcessor({ ...processor, cores: e.target.value })
            }
          >
            <option value="" disabled>
              Cantidad de núcleos
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
          <input
            type="text"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Modelo"
            value={processor.model}
            onChange={(e) =>
              setProcessor({ ...processor, model: e.target.value })
            }
          />
          <input
            type="number"
            className="input-none bg-dark black-shadow rounded-lg py-1 px-3"
            placeholder="Velocidad GHz"
            value={processor.speed}
            onChange={(e) =>
              setProcessor({ ...processor, speed: e.target.value })
            }
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postProcessor(processor)}
            disabled={
              !processor.brand ||
              !processor.model ||
              !processor.speed ||
              !processor.graph ||
              !processor.cores
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
        {pcsLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          <div className="bg-dark p-1 rounded-lg black-shadow">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Velocidad</th>
                  <th scope="col">Gráfica integrada</th>
                  <th scope="col">Núcleos</th>
                </tr>
              </thead>
              <tbody>
                {filteredProcessors.map((processor) => (
                  <tr
                    key={processor._id}
                    className="cursor-pointer"
                    onClick={() => deleteProcessor(processor)}
                  >
                    <td>{processor.brand}</td>
                    <td>{processor.model}</td>
                    <td>{processor.speed} GHz</td>
                    <td>{processor.graph}</td>
                    <td>{processor.cores}</td>
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
