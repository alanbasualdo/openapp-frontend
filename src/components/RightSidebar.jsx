import { useState } from "react";

export const RightSidebar = ({ showRightbar }) => {
  return (
    <>
      {showRightbar && (
        <div
          className="offcanvas-end show bg-blue-600 relative w-50"
          style={{ height: "calc(100vh - 60px)" }}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="p-3">
            <div className="offcanvas-header">
              <div className="text-center">
                <img src="..." className="rounded" alt="..." />
              </div>
            </div>
            <div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                />
                <button className="btn btn-sm btn-outline-dark" type="button">
                  Buscar
                </button>
              </div>
            </div>
            <div className="offcanvas-body text-white">
              <ul>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
