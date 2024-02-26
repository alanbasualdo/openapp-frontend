export const CreateTicket = () => {
  return (
    <>
      <div
        className="bg-white rounded-lg p-3 mt-2"
        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.7)" }}
      >
        <div className="input-group input-group-sm  mb-3">
          <label className="input-group-text font-semibold">Área</label>
          <select className="form-select">
            <option defaultValue="" disabled>
              Choose...
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text font-semibold">Categoría</label>
          <select className="form-select">
            <option defaultValue="" disabled>
              Choose...
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm  mb-3">
          <label className="input-group-text font-semibold">Subcategoría</label>
          <select className="form-select">
            <option defaultValue="" disabled>
              Choose...
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Título</span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Descripción</span>
          <textarea className="form-control"></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text font-semibold">Adjuntos</label>
          <input type="file" className="form-control" />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text font-semibold">Observadores</span>
          <input type="text" className="form-control" />
        </div>
        <div className="text-center">
          <button className="btn btn-sm btn-primary">Crear</button>
        </div>
      </div>
    </>
  );
};
