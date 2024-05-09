import moment from "moment";
import { useState } from "react";

export const TicketList = ({ user, tickets, setSelectedTicket }) => {
  const [orderByStatus, setOrderByStatus] = useState("");

  const handleOrderByStatus = (status) => {
    // Si se hace clic en la misma opción, desactivar el filtro
    setOrderByStatus((prevStatus) => (prevStatus === status ? "" : status));
  };

  const filteredByStatus = orderByStatus
    ? tickets.filter((ticket) => ticket.status === orderByStatus)
    : tickets;

  return (
    <div className="mt-3 mx-3">
      <div className="flex justify-end mb-3 gap-3">
        <div
          className="flex items-center gap-x-1.5 cursor-pointer text-gray-100 hover:text-gray-400"
          onClick={() => handleOrderByStatus("Pendiente")}
        >
          {orderByStatus === "Pendiente" ? (
            <div className="flex-none rounded-full bg-blue-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            </div>
          ) : (
            <div className="flex-none rounded-full bg-blue-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-dark" />
            </div>
          )}
          <p className="text-xs font-medium">Pendientes</p>
        </div>
        <div
          className="flex items-center gap-x-1.5 cursor-pointer text-gray-100 hover:text-gray-400"
          onClick={() => handleOrderByStatus("En curso")}
        >
          {orderByStatus === "En curso" ? (
            <div className="flex-none rounded-full bg-red-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </div>
          ) : (
            <div className="flex-none rounded-full bg-red-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-dark" />
            </div>
          )}
          <p className="text-xs font-medium">En curso</p>
        </div>
        <div
          className="flex items-center gap-x-1.5 cursor-pointer text-gray-100 hover:text-gray-400"
          onClick={(e) => handleOrderByStatus("En espera")}
        >
          {orderByStatus === "En espera" ? (
            <div className="flex-none rounded-full bg-yellow-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            </div>
          ) : (
            <div className="flex-none rounded-full bg-yellow-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-dark" />
            </div>
          )}
          <p className="text-xs font-medium">En espera</p>
        </div>
        <div
          className="flex items-center gap-x-1.5 cursor-pointer text-gray-100 hover:text-gray-400"
          onClick={(e) => handleOrderByStatus("Cerrado")}
        >
          {orderByStatus === "Cerrado" ? (
            <div className="flex-none rounded-full bg-gray-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
            </div>
          ) : (
            <div className="flex-none rounded-full bg-gray-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-dark" />
            </div>
          )}
          <p className="text-xs font-medium">Cerrados</p>
        </div>
      </div>
      <ul>
        {filteredByStatus?.map((ticket) => (
          <li
            key={ticket._id}
            className={`flex justify-between gap-x-0 rounded-lg px-3 py-2 cursor-pointer bg-gray mb-2 hover:bg-gray-700`}
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="col col-2">
              <div className="flex flex-col justify-center items-start">
                {ticket.status === "Pendiente" ? (
                  <div className="flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-blue-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </div>
                    <p className="text-xs font-medium text-white">
                      {ticket.status}
                    </p>
                  </div>
                ) : ticket.status === "En curso" ? (
                  <div className="flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-red-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    </div>
                    <p className="text-xs font-medium text-white">
                      {ticket.status}
                    </p>
                  </div>
                ) : ticket.status === "En espera" ? (
                  <div className="flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    </div>
                    <p className="text-xs font-medium text-white">
                      {ticket.status}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-gray-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    </div>
                    <p className="text-xs font-medium text-white">
                      {ticket.status}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-gray-400 mt-1" style={{ fontSize: "9px" }}>
                {moment(ticket.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </p>
            </div>
            <div className="col col-10">
              <div className="flex flex-col justify-center items-end">
                <p className="text-xs text-white truncate md:truncate-words-lg lg:truncate-words-xl">
                  {ticket.title}
                </p>
                <p
                  className="text-gray-400 mt-1 text-end"
                  style={{ fontSize: "10px" }}
                >
                  De: {ticket.createdBy.name} {ticket.createdBy.lastName}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
