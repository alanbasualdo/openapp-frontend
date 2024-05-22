import Swal from "sweetalert2";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import moment from "moment";

export const UserManageTicket = ({ selectedTicket }) => {
  const { VITE_BACKEND } = getEnvVariables();

  const openImage = (atta) => {
    Swal.fire({
      imageUrl: `${VITE_BACKEND}/uploads/${atta}`,
      imageWidth: 1000,
      imageAlt: atta,
      background: "rgba(33, 37, 41)",
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className="rounded-lg py-3 px-4 text-white bg-gray mb-3">
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
            <p className="text-xs text-secondary">ID {selectedTicket._id}</p>
          </div>
          <div>
            <h1 className="text-sm flex justify-end font-medium">
              {selectedTicket.createdBy.name}{" "}
              {selectedTicket.createdBy.lastName}
            </h1>
            <p className="text-secondary text-xs flex justify-end">
              {moment(selectedTicket.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>
        </div>
        <hr className="mt-2 mb-3" />
        <div className="d-flex gap-3 justify-center align-center">
          <div className="col-6">
            <div className="w-full mb-3">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Título
              </div>
              <p className="px-2 py-1 text-sm">{selectedTicket.title}</p>
            </div>
            <div className="w-full mb-3">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Descripción
              </div>
              <p className="px-2 py-1 text-sm">{selectedTicket.description}</p>
            </div>
            <div className="w-full mb-3">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Categoría
              </div>
              <p className="px-2 py-1 text-sm">{selectedTicket.category.categoryName}</p>
            </div>
            <div>
              <div className="py-1 px-2 w-full text-xs font-medium">
                Observadores
              </div>
              <hr />
              <ul className="flex flex-wrap gap-1 mt-3">
                {selectedTicket.observers.map((obs) => (
                  <li
                    key={obs._id}
                    className="cursor-pointer text-xs mb-3"
                    title="Eliminar"
                    onClick={(e) => putObservers(obs._id)}
                  >
                    <span className="rounded-lg bg-dark p-2 hover:border border-red-600">
                      {obs.name} {obs.lastName}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="py-1 px-2 w-full text-xs font-medium">
                Adjuntos
              </div>
              <hr />
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedTicket.attachments.map((atta, index) => (
                  <img
                    src={`${VITE_BACKEND}/uploads/${atta}`}
                    className="w-16 h-auto rounded-lg hover:border cursor-pointer border-secondary"
                    title={atta}
                    key={`${atta}-${index}`}
                    onClick={(e) => openImage(atta)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex flex-column">
            <div className="border rounded-lg border-secondary bg-dark mb-2 flex-grow-1">
              <div className="p-2 flex-grow">
                {/* Mensaje recibio */}
                <div className="bg-opencars px-2 py-1 rounded-lg max-w-60 mb-1">
                  <p className="text-white text-xs font-medium w-full">
                    hola mundo
                  </p>
                  <p
                    className="text-right text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    12:00
                  </p>
                </div>
                {/* Mensaje enviado */}
                <div className="bg-secondary px-2 py-1 rounded-lg max-w-60 mb-1 ml-auto">
                  <p className="text-white font-medium text-xs text-right w-full">
                    hola mundo
                  </p>
                  <p className="text-gray-300" style={{ fontSize: "10px" }}>
                    12:00
                  </p>
                </div>
              </div>
            </div>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
              />
              <button className="btn btn-sm btn-dark">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
