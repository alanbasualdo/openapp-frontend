import { useEffect, useState } from "react";
import { useFileDropzone } from "../hooks/Users/useFileDropzone";
import { useAreaSectionStore } from "../hooks/PositionsSections/useAreaSectionStore";
import { useTicketsStore } from "../hooks/Tickets/useTicketsStore";
import { TicketList } from "../components/tickets/TicketList";

export const CreateTicket = ({ user, users }) => {
  const initialStateTicket = {
    area: "",
    category: "",
    subcategory: "",
    title: "",
    description: "",
    observers: [],
  };

  const [ticket, setTicket] = useState(initialStateTicket);
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { getRootPropsFile, getInputPropsFile, isDragActiveFile, removeFile } =
    useFileDropzone(files, setFiles);
  const { areas, startGetAreas } = useAreaSectionStore();
  const { startPostTicket, startGetTickets } = useTicketsStore();

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    // Filtrar los usuarios cuyo nombre comience con el valor del input y que no estén en selectedObservers
    const filteredSuggestions = users.filter(
      (filteredUser) =>
        (filteredUser.name.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          filteredUser.lastName
            .toLowerCase()
            .startsWith(inputValue.toLowerCase())) &&
        !ticket.observers.includes(filteredUser._id)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleRemoveObserver = (index) => {
    setTicket({
      ...ticket,
      observers: ticket.observers.filter((_, i) => i !== index),
    });
  };

  const createTicket = async () => {
    await startPostTicket(ticket, files);
    startGetTickets();
  };

  useEffect(() => {
    startGetAreas();
  }, [ticket]);

  useEffect(() => {
    startGetTickets();
  }, []);

  return (
    <>
      <div className="rounded-lg p-4 text-white bg-gray mx-3">
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="input-group input-group-sm lg:w-64 w-full">
            <label className="input-group-text font-medium bg-dark text-white input-none">
              Área
            </label>
            <select
              className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white"
              value={ticket.area}
              onChange={(e) => setTicket({ ...ticket, area: e.target.value })}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group input-group-sm lg:w-64 w-full">
            <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
              Categoría
            </label>
            <select
              className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
              value={ticket.category}
              onChange={(e) =>
                setTicket({ ...ticket, category: e.target.value })
              }
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
            </select>
          </div>
          <div className="input-group input-group-sm lg:w-64 w-full">
            <label className="input-group-text font-medium bg-dark text-white input-none">
              Subcategoría
            </label>
            <select
              className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white"
              value={ticket.subcategory}
              onChange={(e) =>
                setTicket({ ...ticket, subcategory: e.target.value })
              }
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
              <option value="asdasdasdasdasdasdas">asdasdasdasdasdasdas</option>
            </select>
          </div>
        </div>

        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-medium bg-dark text-white input-none">
            Título
          </span>
          <input
            type="text"
            className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-medium bg-dark text-white input-none">
            Descripción
          </span>
          <textarea
            className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
            value={ticket.description}
            rows={3}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-medium bg-dark text-white input-none">
            Observadores
          </span>
          <input
            type="text"
            className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>

        {suggestions.length > 0 && inputValue && (
          <ul className="mb-3 flex flex-wrap gap-1">
            {suggestions.map((user, index) => (
              <li
                key={index}
                onClick={() => {
                  setTicket((prevTicket) => ({
                    ...prevTicket,
                    observers: [...prevTicket.observers, user],
                  }));
                  setInputValue("");
                  setSuggestions([]);
                }}
                className="cursor-pointer text-xs flex"
              >
                <span className="rounded-lg bg-dark p-2 hover:border">
                  {user.name} {user.lastName}
                </span>
              </li>
            ))}
          </ul>
        )}

        {ticket.observers.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-1">
            {ticket.observers.map((observer, index) => (
              <li
                key={index}
                onClick={() => handleRemoveObserver(index)}
                className="cursor-pointer text-xs"
                title="Eliminar"
              >
                <span className="rounded-lg bg-dark p-2 hover:border border-red-600">
                  {observer.name} {observer.lastName}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div
          {...getRootPropsFile()}
          className="bg-dark rounded-lg p-3 mb-3 cursor-pointer hover:border text-xs"
        >
          <input {...getInputPropsFile()} />
          {isDragActiveFile ? (
            <p>Suelte los archivos aquí...</p>
          ) : (
            <p>
              Arrastre y suelte aquí los adjuntos, o haz clic para seleccionar
            </p>
          )}
        </div>
        {files.length > 0 && (
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center gap-2"
              >
                {!file.type.startsWith("image/") ? (
                  <>
                    <i className="ri-file-text-fill text-5xl text-dark"></i>
                    <a
                      href={URL.createObjectURL(file)}
                      download={file.name}
                      className="text-xs"
                    >
                      {file.name.length > 20
                        ? file.name.slice(0, 20) + "..."
                        : file.name}
                    </a>
                  </>
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="rounded-lg"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <button
                  className="btn btn-sm btn-outline-danger input-none"
                  type="button"
                  onClick={() => removeFile(index, "dni")}
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="text-center d-flex justify-content-center gap-3">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setTicket(initialStateTicket), setFiles([]);
            }}
          >
            Limpiar
          </button>
          <button
            className="btn btn-sm btn-opencars"
            onClick={() => createTicket()}
          >
            Listo
          </button>
        </div>
      </div>
      <TicketList user={user} />
    </>
  );
};
