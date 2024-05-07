import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/Users/useAuthStore";
import { gsap } from "gsap";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";

export const Navbar = ({
  funcShowLeftbar,
  funcShowRightbar,
  showContent,
  setSetShowContent,
  setShowLeftbar,
  setShowRightbar,
  user,
}) => {
  const { startLogout } = useAuthStore();
  const textRef = useRef(null);
  gsap.registerPlugin(TextPlugin);

  const funcCloseBar = () => {
    if (!showContent) {
      setSetShowContent(true);
      setShowLeftbar(false);
      setShowRightbar(false);
    }
  };

  const handleHover = () => {
    gsap.to(textRef.current, {
      duration: 0.5,
      text: "OpenApp",
      x: 20,
      opacity: 1,
      ease: "power2.inOut",
    });
  };

  const handleLeave = () => {
    gsap.to(textRef.current, {
      duration: 0.5,
      text: "OA",
      x: 0,
      opacity: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className="bg-gray flex items-center justify-between"
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
      <div
        className="ml-2 text-2xl sm:text-3xl font-semibold"
        onMouseEnter={window.innerWidth > 768 ? handleHover : undefined}
        onMouseLeave={window.innerWidth > 768 ? handleLeave : undefined}
      >
        <Link
          className="nav-link text-opencars"
          to="/home"
          onClick={() => funcCloseBar()}
        >
          <span ref={textRef}>OA</span>
        </Link>
      </div>
      <div>
        <ul className="nav nav-underline d-inline-flex gap-4">
          <li className="nav-item" title="Inicio">
            <Link
              className="nav-link text-opencars"
              to="/home"
              onClick={() => funcCloseBar()}
            >
              <i className="ri-home-2-fill text-2xl sm:text-3xl"></i>
            </Link>
          </li>
          <li className="nav-item" title="Trabajo">
            <button
              className="nav-link text-opencars"
              onClick={() => funcShowLeftbar()}
            >
              <i className="ri-tools-fill text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Personas">
            <button
              className="nav-link text-opencars"
              onClick={() => funcShowRightbar()}
            >
              <i className="ri-group-fill text-2xl sm:text-3xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Dólar">
            <Link
              className="nav-link text-opencars"
              to="/dollar"
              onClick={() => funcCloseBar()}
            >
              <i className="ri-money-dollar-circle-fill text-2xl sm:text-3xl"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-end me-2 px-2">
        <div className="offcanvas-header dropdown">
          <img
            src={`https://api.opencars.com.ar/api/download/usuarios/${user.cuil}`}
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
          <ul className="dropdown-menu text-xs">
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
            <li className="dropdown-item" onClick={() => startLogout()}>
              <Link to="/login">Cerra sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
