import { useEffect, useState } from "react";
import { useFileDropzone } from "../hooks/Users/useFileDropzone";
import { useAreaSectionStore } from "../hooks/PositionsSections/useAreaSectionStore";
import { useTicketsStore } from "../hooks/Tickets/useTicketsStore";
import { TicketList } from "../components/tickets/TicketList";
import { showErrorMessage, showSuccessMessage } from "../utils/showMessages";
import { useSelector } from "react-redux";
import { UserManageTicket } from "../components/tickets/UserManageTicket";
import { useCategoriesStore } from "../hooks/Tickets/useCategoriesStore";

export const CreateTicket = ({ user, users, socket }) => {
  const initialStateTicket = {
    area: "",
    category: "",
    title: "",
    description: "",
    observers: [],
  };

  const [ticket, setTicket] = useState(initialStateTicket);
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { getRootPropsFile, getInputPropsFile, isDragActiveFile, removeFile } =
    useFileDropzone("ticketFiles", files, setFiles);
  const { areas } = useSelector((state) => state.companySection);
  const { startGetAreas } = useAreaSectionStore();
  const { startGetCategoriesByArea } = useCategoriesStore();
  const { startPostTicket, startGetTicketByUser } = useTicketsStore();
  const { tickets, categories } = useSelector((state) => state.tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

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
    try {
      const data = await startPostTicket(ticket, files);
      if (data.success) {
        showSuccessMessage(data.message);
        clearTicket();
        startGetTicketByUser(user._id);
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.response.data.message);
    }
  };

  const clearTicket = () => {
    setTicket(initialStateTicket);
    setFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSelectedTicket(null);
    }
  };

  useEffect(() => {
    startGetTicketByUser(user._id);
  }, []);

  useEffect(() => {
    startGetAreas();
  }, []);

  useEffect(() => {
    if (ticket.area) {
      startGetCategoriesByArea(ticket.area);
    }
  }, [ticket.area]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {selectedTicket ? (
        <>
          <div className="text-end">
            <button className="mb-1" onClick={() => setSelectedTicket(null)}>
              <i className="ri-close-fill text-sm cursor-pointer text-red-600 font-bold hover:text-red-300"></i>
            </button>
          </div>
          <UserManageTicket
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            socket={socket}
          />
        </>
      ) : (
        <>
          <div className="rounded-lg py-3 px-4 text-white bg-gray mb-3">
            <div className="mb-3">
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="input-group input-group-sm w-full">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Título
                  </span>
                  <input
                    type="text"
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={ticket.title}
                    onChange={(e) =>
                      setTicket({ ...ticket, title: e.target.value })
                    }
                  />
                </div>
                <div className="input-group input-group-sm w-full">
                  <label className="input-group-text font-medium bg-dark text-white input-none">
                    Área
                  </label>
                  <select
                    className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={ticket.area}
                    onChange={(e) =>
                      setTicket({ ...ticket, area: e.target.value })
                    }
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
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="input-group input-group-sm w-full">
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
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
              className="bg-dark rounded-lg p-3 mb-3 cursor-pointer hover:border text-sm text-center"
            >
              <input {...getInputPropsFile()} />
              {isDragActiveFile ? (
                <p>Suelte los archivos aquí...</p>
              ) : (
                <p>
                  Arrastre y suelte aquí los adjuntos, o haz clic para
                  seleccionar
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
                onClick={clearTicket}
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
        </>
      )}
      <TicketList
        user={user}
        tickets={tickets}
        setSelectedTicket={setSelectedTicket}
        socket={socket}
        selectedTicket={selectedTicket}
      />
    </>
  );
};
