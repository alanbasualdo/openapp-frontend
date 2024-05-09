import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useComputersSectionStore } from "../../../hooks/PCs/useComputersSectionStore";
import { useDisksSectionStore } from "../../../hooks/PCs/useDisksSectionStore";
import { useModelsSectionStore } from "../../../hooks/PCs/useModelsSectionStore";
import { useProcessorsSectionStore } from "../../../hooks/PCs/useProcessorsSectionStore";
import { useRamSectionStore } from "../../../hooks/PCs/useRamSectionStore";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import { useUserStore } from "../../../hooks/Users/useUserStore";

export const Computers = ({ setBtnActivated }) => {
  const { startPostComputer, startGetComputers, startDeleteComputer } =
    useComputersSectionStore();
  const { startGetDisks } = useDisksSectionStore();
  const { startGetModels } = useModelsSectionStore();
  const { startGetProcessors } = useProcessorsSectionStore();
  const { startGetRams } = useRamSectionStore();
  const { startGetUsers } = useUserStore();
  const { pcsLoading, computers, disks, models, processors, rams } =
    useSelector((state) => state.pcsSection);
  const { users } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);
  const [haveGraphicCard, setHaveGraphicCard] = useState("");

  const filteredComputers = computers.filter((computer) =>
    computer.serialNumber.toLowerCase().includes(search.toLowerCase())
  );

  const computersInitialState = {
    model: "",
    disk: "",
    ram: "",
    processor: "",
    type: "",
    serialNumber: "",
    graphicCard: "",
    employee: "",
  };

  const [computer, setComputer] = useState(computersInitialState);

  const postComputer = async (computer) => {
    try {
      const data = await startPostComputer(computer);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setComputer(computersInitialState);
        startGetComputers();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteComputer = async (computer) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteComputer(computer._id);
        if (data.success) {
          startGetComputers();
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
    startGetComputers();
    startGetModels();
    startGetDisks();
    startGetProcessors();
    startGetRams();
    startGetUsers();
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
            <h1 className="font-medium">Agregar computadora</h1>
          ) : (
            <h1 className="font-medium">Computadoras</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setComputer(computersInitialState);
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
          {/* TYPE */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={computer.type}
            onChange={(e) => setComputer({ ...computer, type: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar tipo
            </option>
            <option value="Portátil">Portátil</option>
            <option value="De escritorio">De escritorio</option>
          </select>
          {/* MODEL */}
          {computer.type === "Portátil" && (
            <select
              className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
              value={computer.model}
              onChange={(e) =>
                setComputer({ ...computer, model: e.target.value })
              }
            >
              <option value="" disabled>
                Seleccionar modelo
              </option>
              {models.map((model) => (
                <option value={model._id}>
                  {model.brand} {model.model}
                </option>
              ))}
            </select>
          )}
          {/* DISK */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={computer.disk}
            onChange={(e) => setComputer({ ...computer, disk: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar disco
            </option>
            {disks.map((disk) => (
              <option value={disk._id} key={disk._id}>
                {disk.brand} {disk.model} {disk.type} {disk.volume}GB
              </option>
            ))}
          </select>
          {/* RAM */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={computer.ram}
            onChange={(e) => setComputer({ ...computer, ram: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar ram
            </option>
            {rams.map((ram) => (
              <option value={ram._id} key={ram._id}>
                {ram.brand} {ram.model} {ram.ddr} {ram.speed}MHz {ram.volume}GB
              </option>
            ))}
          </select>
          {/* PROCESSOR */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={computer.processor}
            onChange={(e) =>
              setComputer({ ...computer, processor: e.target.value })
            }
          >
            <option value="" disabled>
              Seleccionar procesador
            </option>
            {processors.map((processor) => (
              <option value={processor._id} key={processor._id}>
                {processor.brand} {processor.model} {processor.speed}MHz{" "}
                {processor.cores}{" "}
                {processor.graph === "Si" ? "Gráfica incorporada" : ""}
              </option>
            ))}
          </select>
          {/* SERIAL NUMBER */}
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Número de serie"
            value={computer.serialNumber}
            onChange={(e) =>
              setComputer({ ...computer, serialNumber: e.target.value })
            }
          />
          {/* GRAPHIC CARD */}
          <select
            className="input-none bg-dark rounded-lg py-1 px-3 text-white"
            value={haveGraphicCard}
            onChange={(e) => setHaveGraphicCard(e.target.value)}
          >
            <option value="" disabled>
              ¿Tiene tarjeta gráfica?
            </option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          {haveGraphicCard === "Sí" && (
            <input
              type="text"
              className="input-none bg-dark  rounded-lg py-1 px-3"
              placeholder="Nombre de la tarjeta gráfica"
              value={computer.graphicCard}
              onChange={(e) =>
                setComputer({ ...computer, graphicCard: e.target.value })
              }
            />
          )}
          <select
            className="input-none bg-dark rounded-lg py-1 px-3 text-white"
            value={computer.employee}
            onChange={(e) =>
              setComputer({ ...computer, employee: e.target.value })
            }
          >
            <option value="" disabled>
              Colaborador
            </option>
            {users.map((user) => (
              <option value={user._id} key={user._id}>
                {user.name} {user.lastName}
              </option>
            ))}
          </select>
          <button
            className="btn btn-sm btn-success"
            onClick={() => postComputer(computer)}
            disabled={
              !computer.type ||
              !computer.disk ||
              !computer.ram ||
              !computer.processor ||
              !computer.serialNumber
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
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Disco</th>
                  <th scope="col">RAM</th>
                  <th scope="col">Procesador</th>
                  <th scope="col">Número de serie</th>
                  <th scope="col">Tarjeta gráfica</th>
                  <th scope="col">Gráfica integrad</th>
                  <th scope="col">Colaborador</th>
                </tr>
              </thead>
              <tbody>
                {filteredComputers.map((computer) => (
                  <tr
                    key={computer._id}
                    className="cursor-pointer"
                    onClick={() => deleteComputer(computer)}
                  >
                    <td>{computer.type}</td>
                    {computer.model ? (
                      <>
                        <td>{computer.model.brand || ""}</td>
                        <td>{computer.model.model || ""}</td>
                      </>
                    ) : (
                      <>
                        <td>No aplica</td>
                        <td>No aplica</td>
                      </>
                    )}
                    <td>
                      {computer.disk.brand} {computer.disk.model}{" "}
                      {computer.disk.type} {computer.disk.volume} GB
                    </td>
                    <td>
                      {computer.ram.brand} {computer.ram.model}{" "}
                      {computer.ram.ddr} {computer.ram.volume} GB{" "}
                      {computer.ram.speed} MHz
                    </td>
                    <td>
                      {computer.processor.brand} {computer.processor.model}{" "}
                      {computer.processor.speed} GHz {computer.processor.cores}{" "}
                      Núcleos
                    </td>
                    <td>{computer.serialNumber || ""}</td>
                    <td>{computer.graphicCard || "No tiene"}</td>
                    <td>{computer.processor.graph}</td>
                    <td>
                      {computer.employee.name} {computer.employee.lastName}
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
