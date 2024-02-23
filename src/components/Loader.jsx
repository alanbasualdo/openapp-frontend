import React from "react";

export const Loader = () => {
  return (
    <div className="w-full h-screen bg-dark text-white text-center justify-content-center d-flex align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};
