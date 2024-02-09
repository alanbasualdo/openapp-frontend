import { Link } from "react-router-dom";

export const Navbar = ({
  showLeftbar,
  setShowLeftbar,
  showRightbar,
  setShowRightbar,
}) => {
  return (
    <div
      className="bg-white border-b flex items-center justify-between"
      style={{
        height: "60px",
        position: "fixed",
        width: "100%",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="text-primary ml-2 text-2xl sm:text-3xl font-bold">OA</div>
      <div>
        <ul className="nav nav-underline d-inline-flex gap-4">
          <li className="nav-item" title="Inicio">
            <Link className="nav-link" to="/home">
              <i className="ri-home-2-fill text-primary text-2xl sm:text-3xl"></i>
            </Link>
          </li>
          <li className="nav-item" title="Trabajo">
            <button
              className="nav-link"
              onClick={() => setShowLeftbar(!showLeftbar)}
            >
              <i className="ri-tools-fill text-primary text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Personas">
            <button
              className="nav-link"
              onClick={() => setShowRightbar(!showRightbar)}
            >
              <i className="ri-group-fill text-primary text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Dólar">
            <Link className="nav-link" to="/dollar">
              <i className="ri-money-dollar-circle-fill text-primary text-2xl sm:text-3xl"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="text-end me-2 text-primary hover:bg-gray-150 cursor-pointer px-1 hover:rounded-xl hover:border"
        title="Salir"
      >
        <i className="ri-logout-circle-r-line text-2xl sm:text-3xl"></i>
      </div>
    </div>
  );
};
