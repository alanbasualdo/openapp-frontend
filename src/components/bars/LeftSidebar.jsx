import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setArea } from "../../store/slices/ticketsSlice";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import { useEffect } from "react";

export const LeftSidebar = ({
  showLeftbar,
  showContent,
  setSetShowContent,
  setShowLeftbar,
  user
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { areas } = useSelector((state) => state.companySection);
  const { startGetAreas } = useAreaSectionStore();
  const isActive = (path) => {
    return location.pathname === path ? "font-bold" : "";
  };

  const funcCloseBar = () => {
    if (!showContent) {
      setSetShowContent(true);
      setShowLeftbar(false);
    }
  };

  const handleTicketArea = (areaName) => {
    const area = areas.find((area) => area.name === areaName);
    if (area) {
      dispatch(setArea(area._id));
    } else {
      dispatch(setArea(areaName));
    }
  };

  useEffect(() => {
    startGetAreas();
  }, []);

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
          <div className="ml-3 mt-3 text-xs">
            <div className="mb-5">
              <h2 className="font-bold">Tickets</h2>
              <ul className="mt-3 ml-7">
                <li className={`list-disc mb-2 ${isActive("/createticket")}`}>
                  <Link
                    className="hover:font-bold"
                    to="/createticket"
                    onClick={() => {
                      funcCloseBar();
                      handleTicketArea("userTicket");
                    }}
                  >
                    Crear ticket
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

            {(user.area.name === "Sistemas" || user.area.name === "Logistica") && (
              <div className="mb-5">
                <h2 className="font-bold">
                  {user.area.name === "Sistemas" ? "Dpto. de sistemas" : "Dpto. de logistica"}
                </h2>
                <ul className="mt-3 ml-7">
                  <li
                    className={`list-disc mb-2 ${isActive("/managetickets")}`}
                  >
                    <Link
                      className="hover:font-bold"
                      to="/managetickets"
                      onClick={() => {
                        funcCloseBar();
                        handleTicketArea(user.area.name);
                      }}
                    >
                      Gestionar tickets
                    </Link>
                  </li>
                  {user.area.name === "Sistemas" && (
                    <>
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
                    </>
                  )}
                </ul>
              </div>
            )}

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
        </div>
      )}
    </>
  );
};
