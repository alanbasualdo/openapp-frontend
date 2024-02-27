import { Link } from "react-router-dom";

export const LeftSidebar = ({
  showLeftbar,
  showContent,
  setSetShowContent,
  setShowLeftbar,
}) => {
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
            width: showContent ? "550px" : "100vw",
            position: !showContent && "absolute",
          }}
          tabIndex="-1"
        >
          {/* Start Departamentos */}
          <div
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
            className="text-sm"
          >
            <div className="p-3 mt-3">
              <div className="mb-5">
                <h2 className="font-bold">Tickets</h2>
                <ul className="mt-3 ml-7">
                  <li className="list-disc mb-2">
                    <Link
                      className="hover:font-bold"
                      to="/createTicket"
                      onClick={() => funcCloseBar()}
                    >
                      Crear ticket
                    </Link>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">
                      Gestionar tickets
                    </button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Ver tickets</button>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h2 className="font-bold">Noticias</h2>
                <ul className="mt-3 ml-7">
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Bienvenidas</button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">
                      Búsqueda de personal
                    </button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">
                      Cartas de presidencia
                    </button>
                  </li>
                  <li className="list-disc mb-2">
                    <Link className="hover:font-bold" to="/createTicket">
                      Circulares
                    </Link>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Compliance</button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Despedidas</button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Máximas</button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Reconocimientos</button>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h2 className="font-bold">Dpto. de sistemas</h2>
                <ul className="mt-3 ml-7">
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">
                      Bajas de cuentas
                    </button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Inventario</button>
                  </li>
                  <li className="list-disc mb-2">
                    <Link className="hover:font-bold" to="/createTicket">
                      Nuevos ingresos
                    </Link>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Permisos</button>
                  </li>
                  <li className="list-disc mb-2">
                    <Link className="hover:font-bold" to="/sections">
                      Secciones
                    </Link>
                  </li>
                  <li className="list-disc mb-2">
                    <Link className="hover:font-bold" to="/users">
                      Usuarios
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h2 className="font-bold">Otros</h2>
                <ul className="mt-3 ml-7">
                  <li className="list-disc mb-2">
                    <Link className="hover:font-bold" to="/createTicket">
                      Redes WiFi
                    </Link>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">
                      Nuestros teléfonos
                    </button>
                  </li>
                  <li className="list-disc mb-2">
                    <button className="hover:font-bold">Organigrama</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End Departamentos */}
          <div
            className="absolute bottom-0 w-full p-3 bg-dark"
            style={{
              boxShadow: "0px -10px 7px -5px rgba(255, 255, 255, 0.1)",
            }}
          >
            <p className="text-white italic text-xs px-3">
              "Lo importante no es ser iguales, lo importante es formar un buen
              equipo."
            </p>
          </div>
        </div>
      )}
    </>
  );
};
