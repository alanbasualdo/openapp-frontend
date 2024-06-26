import Swal from "sweetalert2";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import moment from "moment";

export const UserManageTicket = ({
  selectedTicket,
  }) => {
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

  const isImage = (fileName) => {
    return /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(fileName);
  };

  const isTextFile = (fileName) => {
    return /\.(pdf|docx|txt)$/i.test(fileName);
  };

  return (
    <>
      <div className="rounded-lg py-3 px-4 text-white bg-gray mb-2">
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
        <hr className="mt-2 mb-2" />
        <div className="d-flex gap-3 justify-center align-center">
          <div className="col-6">
            <div className="w-full mb-2">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Título
              </div>
              <p className="px-2 py-1 text-sm">{selectedTicket.title}</p>
            </div>
            <div className="w-full mb-2">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Descripción
              </div>
              <p className="px-2 py-1 text-sm">{selectedTicket.description}</p>
            </div>
            <div className="w-full mb-2">
              <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                Categoría
              </div>
              <p className="px-2 py-1 text-sm">
                {selectedTicket.category.categoryName}
              </p>
            </div>
            <div>
              <div className="py-1 px-2 w-full text-xs font-medium">
                Observadores
              </div>
              <hr />
              {selectedTicket.observers.length === 0 ? (
                <p className="text-xs p-2">No hay observadores.</p>
              ) : (
                <ul className="flex flex-wrap gap-1 mt-2">
                  {selectedTicket.observers.map((obs) => (
                    <li
                      key={obs._id}
                      className="cursor-pointer text-xs mb-2"
                      title="Eliminar"
                      onClick={(e) => putObservers(obs._id)}
                    >
                      <span className="rounded-lg bg-dark p-2 hover:border border-red-600">
                        {obs.name} {obs.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <div className="py-1 px-2 w-full text-xs font-medium">
                Adjuntos
              </div>
              <hr />
              {selectedTicket.attachments.length === 0 ? (
                <p className="text-xs p-2">No hay adjuntos.</p>
              ) : (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedTicket.attachments.map((atta, index) => (
                    <div
                      key={`${atta}-${index}`}
                      className="d-flex flex-column align-items-center gap-2"
                    >
                      {isImage(atta) ? (
                        <img
                          src={`${VITE_BACKEND}/uploads/${atta}`}
                          className="w-16 h-auto rounded-lg hover:border cursor-pointer border-secondary object-cover"
                          title={atta}
                          onClick={() => openImage(atta)}
                        />
                      ) : isTextFile(atta) ? (
                        <>
                          <i className="ri-file-text-fill text-5xl text-dark"></i>
                          <a
                            href={`${VITE_BACKEND}/uploads/${atta}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                          >
                            {atta.length > 20
                              ? atta.slice(0, 20) + "..."
                              : atta}
                          </a>
                        </>
                      ) : (
                        <div>
                          <p>Archivo no soportado</p>
                          <a
                            href={`${VITE_BACKEND}/uploads/${atta}`}
                            download={atta}
                            className="text-xs"
                          >
                            {atta.length > 20
                              ? atta.slice(0, 20) + "..."
                              : atta}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
