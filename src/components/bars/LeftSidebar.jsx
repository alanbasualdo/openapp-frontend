import { Link, useLocation } from "react-router-dom";

export const LeftSidebar = ({
  showLeftbar,
  showContent,
  setSetShowContent,
  setShowLeftbar,
}) => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "font-bold" : "";
  };

  const funcCloseBar = () => {
    if (!showContent) {
      setSetShowContent(true);
      setShowLeftbar(false);
    }
  };

  return (
    <>
      {showLeftbar && (
        <div
          className="offcanvas-end show bg-dark text-white relative"
          style={{
            height: "calc(100vh - 60px)",
            width: showContent ? "600px" : "100vw",
            position: !showContent && "absolute",
            overflowY: "auto",
          }}
          tabIndex="-1"
        >
          {/* Start Departamentos */}
          {/* <div
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
            className="text-sm"
          > */}
          <div className="ml-3 mt-3 text-sm">
            <div className="mb-5">
              <h2 className="font-bold">Tickets</h2>
              <ul className="mt-3 ml-7">
                <li className={`list-disc mb-2 ${isActive("/createticket")}`}>
                  <Link
                    className="hover:font-bold"
                    to="/createticket"
                    onClick={() => funcCloseBar()}
                  >
                    Crear ticket
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/managetickets")}`}>
                  <Link className="hover:font-bold" to="/managetickets">
                    Gestionar tickets
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/seetickets")}`}>
                  <Link className="hover:font-bold" to="/seetickets">
                    Ver tickets
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h2 className="font-bold">Noticias</h2>
              <ul className="mt-3 ml-7">
                <li className={`list-disc mb-2 ${isActive("/welcomes")}`}>
                  <Link className="hover:font-bold" to="/welcomes">
                    Bienvenidas
                  </Link>
                </li>
                <li
                  className={`list-disc mb-2 ${isActive("/staffrecruitment")}`}
                >
                  <Link className="hover:font-bold" to="/staffrecruitment">
                    Búsqueda de personal
                  </Link>
                </li>
                <li
                  className={`list-disc mb-2 ${isActive("/presidencyletters")}`}
                >
                  <Link className="hover:font-bold" to="/presidencyletters">
                    Cartas de presidencia
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/circulars")}`}>
                  <Link className="hover:font-bold" to="/circulars">
                    Circulares
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/compliance")}`}>
                  <Link className="hover:font-bold" to="/compliance">
                    Compliance
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/goodbyes")}`}>
                  <Link className="hover:font-bold" to="/goodbyes">
                    Despedidas
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/maxims")}`}>
                  <Link className="hover:font-bold" to="/maxims">
                    Máximas
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/recognitions")}`}>
                  <Link className="hover:font-bold" to="/recognitions">
                    Reconocimientos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h2 className="font-bold">Dpto. de sistemas</h2>
              <ul className="mt-3 ml-7">
                <li
                  className={`list-disc mb-2 ${isActive("/accountclosures")}`}
                >
                  <Link className="hover:font-bold" to="/accountclosures">
                    Bajas de cuentas
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/inventory")}`}>
                  <Link className="hover:font-bold" to="/inventory">
                    Inventario
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/newentries")}`}>
                  <Link className="hover:font-bold" to="/newentries">
                    Nuevos ingresos
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/permissions")}`}>
                  <Link className="hover:font-bold" to="/permissions">
                    Permisos
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/sections")}`}>
                  <Link className="hover:font-bold" to="/sections">
                    Secciones
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/users")}`}>
                  <Link className="hover:font-bold" to="/users">
                    Usuarios
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h2 className="font-bold">Otros</h2>
              <ul className="mt-3 ml-7">
                <li className={`list-disc mb-2 ${isActive("/wifinetworks")}`}>
                  <Link className="hover:font-bold" to="/wifinetworks">
                    Redes WiFi
                  </Link>
                </li>
                <li className={`list-disc mb-2 ${isActive("/ourtelephones")}`}>
                  <Link className="hover:font-bold" to="/ourtelephones">
                    Nuestros teléfonos
                  </Link>
                </li>
                <li
                  className={`list-disc mb-2 ${isActive("/organizationchart")}`}
                >
                  <Link className="hover:font-bold" to="/organizationchart">
                    Organigrama
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* </div> */}
          {/* End Departamentos */}
          {/* <div
            className="absolute bottom-0 w-full p-3 bg-dark"
            style={{
              boxShadow: "0px -10px 10px -5px rgba(255, 255, 255, 0.2)",
            }}
          >
            <p className="text-white italic text-xs px-3">
              "Lo importante no es ser iguales, lo importante es formar un buen
              equipo."
            </p>
          </div> */}
        </div>
      )}
    </>
  );
};
