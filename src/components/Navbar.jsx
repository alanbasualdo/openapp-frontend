import { Link } from "react-router-dom";

export const Navbar = ({
  showLeftbar,
  setShowLeftbar,
  showRightbar,
  setShowRightbar,
}) => {
  return (
    <div className="bg-white border-b flex items-center justify-between h-15">
      <div className="text-blue-600 ml-2 sm:text-xl md:text-2xl font-bold">
        OA
      </div>
      <div>
        <ul className="nav nav-underline d-inline-flex gap-4">
          <li className="nav-item" title="Inicio">
            <Link className="nav-link" to="/home">
              <i className="ri-home-2-fill hover:text-blue-600 sm:text-3xl md:text-4xl"></i>
            </Link>
          </li>
          {/*   <li className="nav-item" title="Mi trabajo">
            <Link className="nav-link" to="/work">
              <i className="ri-tools-fill text-blue-600 sm:text-3xl md:text-4xl"></i>
            </Link>
          </li> */}
          <li className="nav-item" title="Mi trabajo">
            <button
              className="nav-link"
              onClick={() => setShowLeftbar(!showLeftbar)}
            >
              <i className="ri-tools-fill text-blue-600 sm:text-3xl md:text-4xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Grupos">
            <button
              className="nav-link"
              onClick={() => setShowRightbar(!showRightbar)}
            >
              <i className="ri-group-fill text-blue-600 sm:text-3xl md:text-4xl"></i>
            </button>
          </li>
          <li className="nav-item" title="Dólar">
            <Link className="nav-link" to="/dollar">
              <i className="ri-money-dollar-circle-fill text-blue-600 sm:text-3xl md:text-4xl"></i>
            </Link>
          </li>
          {/* <li className="nav-item" title="Grupos">
            <Link className="nav-link" to="/groups">
              <i className="ri-group-fill text-blue-600 sm:text-3xl md:text-4xl"></i>
            </Link>
          </li> */}
        </ul>
      </div>
      <div
        className="text-end me-2 text-blue-600 hover:bg-gray-100 cursor-pointer px-1 hover:rounded-xl hover:border"
        title="Salir"
      >
        <i className="ri-logout-circle-r-line sm:text-2xl md:text-3xl"></i>
      </div>
    </div>
  );
};
