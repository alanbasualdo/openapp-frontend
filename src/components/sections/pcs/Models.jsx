import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModelsSectionStore } from "../../../hooks/PCs/useModelsSectionStore";

export const Models = ({ setBtnActivated }) => {
  const { startPostModel, startGetModels, startDeleteModel } =
    useModelsSectionStore();
  const { pcsLoading, models } = useSelector((state) => state.pcsSection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredModels = models.filter(
    (model) =>
      model.brand.toLowerCase().includes(search.toLowerCase()) ||
      model.model.toLowerCase().includes(search.toLowerCase())
  );

  const modelsInitialState = {
    brand: "",
    model: "",
  };

  const [model, setModel] = useState(modelsInitialState);

  const postModel = async (model) => {
    try {
      const data = await startPostModel(model);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setModel(modelsInitialState);
        startGetModels();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteModel = async (model) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteModel(model._id);
        if (data.success) {
          startGetModels();
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
    startGetModels();
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
            <h1 className="font-medium">Agregar modelo</h1>
          ) : (
            <h1 className="font-medium">Modelos</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setModel(modelsInitialState);
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
            value={model.brand}
            onChange={(e) => setModel({ ...model, brand: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar marca
            </option>
            <option value="Acer">Acer</option>
            <option value="Apple">Apple</option>
            <option value="Asus">Asus</option>
            <option value="Bangho">Banghó</option>
            <option value="Commodore">Commodore</option>
            <option value="Compaq">Compaq</option>
            <option value="CX">CX</option>
            <option value="Dell">Dell</option>
            <option value="Epcom">Epcom</option>
            <option value="Eurocase">Eurocase</option>
            <option value="Exo">Exo</option>
            <option value="Gateway">Gateway</option>
            <option value="Gigabyte">Gigabyte</option>
            <option value="HP">HP</option>
            <option value="Huawei">Huawei</option>
            <option value="Lenovo">Lenovo</option>
            <option value="LG">LG</option>
            <option value="MSI">MSI</option>
            <option value="Nexxt">Nexxt</option>
            <option value="Noblex">Noblex</option>
            <option value="Positivo BGH">Positivo BGH</option>
            <option value="Razer">Razer</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
            <option value="Toshiba">Toshiba</option>
            <option value="VAIO">VAIO</option>
          </select>
          {/* MODEL */}
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Modelo"
            value={model.model}
            onChange={(e) => setModel({ ...model, model: e.target.value })}
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postModel(model)}
            disabled={!model.brand || !model.model}
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
                </tr>
              </thead>
              <tbody>
                {filteredModels.map((model) => (
                  <tr
                    key={model._id}
                    className="cursor-pointer"
                    onClick={() => deleteModel(model)}
                  >
                    <td>{model.brand}</td>
                    <td>{model.model}</td>
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
