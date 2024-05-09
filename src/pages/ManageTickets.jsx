import { useTicketsStore } from "../hooks/Tickets/useTicketsStore";
import { TicketList } from "../components/tickets/TicketList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnvVariables } from "../helpers/getEnvVariables";
import moment from "moment";

export const ManageTickets = ({ user, users }) => {
  const { tickets, area } = useSelector((state) => state.tickets);
  const { startGetTicketByArea } = useTicketsStore();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { VITE_BACKEND } = getEnvVariables();

  useEffect(() => {
    startGetTicketByArea(area);
  }, []);

  return (
    <>
      <div className="rounded-lg py-3 px-4 text-white bg-gray">
        {selectedTicket && (
          <>
            <div className="flex justify-between">
              <div>
                {selectedTicket.status === "Pendiente" ? (
                  <div className="flex items-center justify-start gap-x-1.5">
                    <div className="flex-none rounded-full bg-blue-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {selectedTicket.status}
                    </p>
                  </div>
                ) : selectedTicket.status === "En curso" ? (
                  <div className="flex items-center justify-start gap-x-1.5">
                    <div className="flex-none rounded-full bg-red-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {selectedTicket.status}
                    </p>
                  </div>
                ) : selectedTicket.status === "En espera" ? (
                  <div className="flex items-center justify-start gap-x-1.5">
                    <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {selectedTicket.status}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-x-1.5">
                    <div className="flex-none rounded-full bg-gray-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {selectedTicket.status}
                    </p>
                  </div>
                )}

                <p className="text-xs text-secondary">
                  ID {selectedTicket._id}
                </p>
              </div>
              <div>
                <h1 className="text-sm flex justify-end font-medium">
                  Creado por: {selectedTicket.createdBy.name}{" "}
                  {selectedTicket.createdBy.lastName}
                </h1>
                <p className="text-secondary text-xs flex justify-end">
                  {moment(selectedTicket.createdAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </p>
              </div>
            </div>
            <hr className="mt-2 mb-3" />
            <div className="d-flex gap-3 justify-center align-center">
              <div className="col-6">
                <div className="input-group input-group-sm w-full mb-3">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Título:
                  </span>
                  <input
                    type="text"
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={selectedTicket.title}
                    readOnly
                  />
                </div>
                <div className="input-group input-group-sm w-full mb-3">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Descripción:
                  </span>
                  <textarea
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={selectedTicket.description}
                    rows={3}
                    readOnly
                  ></textarea>
                </div>
                <div className="input-group input-group-sm w-full mb-3">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Categoría:
                  </span>
                  <input
                    type="text"
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={selectedTicket.category}
                    readOnly
                  />
                </div>
                <div className="input-group input-group-sm w-full mb-3">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Subcategoría:
                  </span>
                  <input
                    type="text"
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                    value={selectedTicket.subcategory}
                    readOnly
                  />
                </div>
                <div>
                  <div className="bg-dark py-1 px-2 w-full text-sm font-medium mb-3 rounded-sm">
                    Observadores:
                  </div>
                  <ul className="flex flex-wrap gap-1">
                    {selectedTicket.observers.map((obs) => (
                      <li
                        key={obs._id}
                        className="cursor-pointer text-xs mb-3"
                        title="Eliminar"
                      >
                        <span className="rounded-lg bg-dark p-2 hover:border border-red-600">
                          {obs.name} {obs.lastName}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-dark py-1 px-2 w-full text-sm font-medium mb-3 rounded-sm">
                    Adjuntos:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedTicket.attachments.map((atta, index) => (
                      <img
                        src={`${VITE_BACKEND}/uploads/${atta}`}
                        className="w-24 h-auto rounded-lg hover:border cursor-pointer border-secondary"
                        title={atta}
                        key={`${atta}-${index}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-6 h-full">
                <div className="border rounded-lg border-secondary bg-dark mb-2 h-96"></div>
                <div className="input-group input-group-sm w-full">
                  <input
                    type="text"
                    className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                  />
                  <button className="py-1 px-3 text-sm font-medium bg-dark text-white">
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <TicketList
        user={user}
        tickets={tickets}
        setSelectedTicket={setSelectedTicket}
      />
    </>
  );
};
