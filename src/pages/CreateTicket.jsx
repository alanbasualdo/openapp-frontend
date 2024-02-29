import { useState } from "react";

export const CreateTicket = () => {
  const initialStateTicket = {
    area: "",
    category: "",
    subcategory: "",
    title: "",
    description: "",
    attachments: "",
    observers: "",
  };

  const [ticket, setTicket] = useState(initialStateTicket);

  const createTicket = () => {
    console.log(ticket);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl p-3 mt-2"
        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.7)" }}
      >
        <div className="input-group input-group-sm  mb-3">
          <label className="input-group-text font-semibold">Área</label>
          <select
            className="form-select"
            value={ticket.area}
            onChange={(e) => setTicket({ ...ticket, area: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar área
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text font-semibold">Categoría</label>
          <select
            className="form-select"
            value={ticket.category}
            onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
          >
            <option value="" disabled>
              Seleccionar categoría
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm  mb-3">
          <label className="input-group-text font-semibold">Subcategoría</label>
          <select
            className="form-select"
            value={ticket.subcategory}
            onChange={(e) =>
              setTicket({ ...ticket, subcategory: e.target.value })
            }
          >
            <option value="" disabled>
              Seleccionar subcategoría
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Título</span>
          <input
            type="text"
            className="form-control"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Descripción</span>
          <textarea
            className="form-control"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text font-semibold">Adjuntos</label>
          <input
            type="file"
            className="form-control"
            value={ticket.attachments}
            onChange={(e) =>
              setTicket({ ...ticket, attachments: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Observadores</span>
          <input
            type="text"
            className="form-control"
            value={ticket.observers}
            onChange={(e) =>
              setTicket({ ...ticket, observers: e.target.value })
            }
          />
        </div>
        <div className="text-center d-flex justify-content-center gap-3">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setTicket(initialStateTicket)}
          >
            Cancelar
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => createTicket()}
          >
            Crear ticket
          </button>
        </div>
      </div>
    </>
  );
};
