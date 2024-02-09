export const CreateTicket = () => {
  return (
    <div className="bg-white rounded-xl p-3 mt-2">
      <div className="input-group input-group-sm  mb-3">
        <label className="input-group-text">Área</label>
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
        <label className="input-group-text">Categoría</label>
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
        <label className="input-group-text">Subcategoría</label>
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
        <span className="input-group-text">Título</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text">Descripción</span>
        <textarea className="form-control"></textarea>
      </div>
      <div className="input-group input-group-sm">
        <label className="input-group-text">Adjuntos</label>
        <input type="file" className="form-control" />
      </div>
    </div>
  );
};
