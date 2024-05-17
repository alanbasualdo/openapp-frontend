import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDisksSectionStore } from "../../../hooks/PCs/useDisksSectionStore";

export const Disks = ({ setBtnActivated }) => {
  const { startPostDisk, startGetDisks, startDeleteDisk } =
    useDisksSectionStore();
  const { pcsLoading, disks } = useSelector((state) => state.pcsSection);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const filteredDisks = disks.filter(
    (disk) =>
      disk.brand.toLowerCase().includes(search.toLowerCase()) ||
      disk.model.toLowerCase().includes(search.toLowerCase())
  );

  const disksInitialState = {
    brand: "",
    model: "",
    type: "",
    volume: "",
  };

  const [disk, setDisk] = useState(disksInitialState);

  const postDisk = async (disk) => {
    try {
      const data = await startPostDisk(disk);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setDisk(disksInitialState);
        startGetDisks();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteDisk = async (disk) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteDisk(disk._id);
        if (data.success) {
          startGetDisks();
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
    startGetDisks();
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
            <h1 className="font-medium">Agregar disco</h1>
          ) : (
            <h1 className="font-medium">Discos</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setDisk(disksInitialState);
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
            value={disk.brand}
            onChange={(e) => setDisk({ ...disk, brand: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar marca
            </option>
            <option value="ADATA">ADATA</option>
            <option value="Corsair">Corsair</option>
            <option value="Crucial">Crucial</option>
            <option value="Dell">Dell</option>
            <option value="Hitachi">Hitachi</option>
            <option value="HP">HP</option>
            <option value="Kingston">Kingston</option>
            <option value="LaCie">LaCie</option>
            <option value="Samsung">Samsung</option>
            <option value="SanDisk">SanDisk</option>
            <option value="Seagate">Seagate</option>
            <option value="Sony">Sony</option>
            <option value="Toshiba">Toshiba</option>
            <option value="Transcend">Transcend</option>
            <option value="Western Digital">Western Digital</option>
          </select>
          {/* MODEL */}
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Modelo"
            value={disk.model}
            onChange={(e) => setDisk({ ...disk, model: e.target.value })}
          />
          {/* TYPE */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={disk.type}
            onChange={(e) => setDisk({ ...disk, type: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar tipo de disco
            </option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
            <option value="SSD NVMe">SSD NVMe</option>
          </select>
          {/* VOLUME */}
          <input
            type="number"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Capacidad GB"
            value={disk.volume}
            onChange={(e) => setDisk({ ...disk, volume: e.target.value })}
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postDisk(disk)}
            disabled={!disk.brand || !disk.model || !disk.type || !disk.volume}
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
                  <th scope="col">Tipo</th>
                  <th scope="col">Capacidad</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisks.map((disk) => (
                  <tr
                    key={disk._id}
                    className="cursor-pointer"
                    onClick={() => deleteDisk(disk)}
                  >
                    <td>{disk.brand}</td>
                    <td>{disk.model}</td>
                    <td>{disk.type}</td>
                    <td>{disk.volume} GB</td>
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
