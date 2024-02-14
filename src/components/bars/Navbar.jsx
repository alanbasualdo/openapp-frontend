import { Link } from "react-router-dom";

export const Navbar = ({
  showLeftbar,
  setShowLeftbar,
  showRightbar,
  setShowRightbar,
}) => {
  return (
    <div
      className="bg-primary flex items-center justify-between"
      style={{
        height: "60px",
        position: "fixed",
        width: "100%",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className="text-light ml-2 text-2xl sm:text-3xl font-bold">OA</div>
      <div>
        <ul className="nav nav-underline d-inline-flex gap-4">
          <li className="nav-item" title="Inicio">
            <Link className="nav-link text-light" to="/home">
              <i className="ri-home-2-fill text-2xl sm:text-3xl"></i>
            </Link>
          </li>
          <li className="nav-item" title="Trabajo">
            <button
              className="nav-link text-light"
              onClick={() => setShowLeftbar(!showLeftbar)}
            >
              <i className="ri-tools-fill text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Personas">
            <button
              className="nav-link text-light"
              onClick={() => setShowRightbar(!showRightbar)}
            >
              <i className="ri-group-fill text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Dólar">
            <Link className="nav-link text-light" to="/dollar">
              <i className="ri-money-dollar-circle-fill text-2xl sm:text-3xl"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-end me-2">
        <div className="offcanvas-header dropdown">
          <img
            src="https://api.opencars.com.ar/api/download/usuarios/20382826001"
            alt="Imagen de perfil"
            className="rounded-full cursor-pointer dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              objectFit: "cover",
              width: "45px",
              height: "45px",
              boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
            }}
          />
          <ul className="dropdown-menu text-sm">
            <li className="dropdown-item mb-1">
              <Link to="/createTicket">Mis vacaciones</Link>
            </li>
            <li className="dropdown-item mb-1">
              <Link to="/createTicket">Mis haberes</Link>
            </li>
            <li className="dropdown-item mb-1">
              <Link to="/createTicket">Mi CV</Link>
            </li>
            <li className="dropdown-item mb-1">
              <Link to="/createTicket">Cambiar contraseña</Link>
            </li>
            <li className="dropdown-item mb-1">
              <Link to="/createTicket">Foto de perfil</Link>
            </li>
            <hr className="mb-1" />
            <li className="dropdown-item">
              <Link to="/createTicket">Cerra sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
