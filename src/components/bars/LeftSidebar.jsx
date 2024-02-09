import { Link } from "react-router-dom";

export const LeftSidebar = ({ showLeftbar }) => {
  return (
    <>
      {showLeftbar && (
        <div
          className="offcanvas-end show bg-blue-600 text-white relative w-50"
          style={{ height: "calc(100vh - 40px)" }}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="p-3 mt-2">
            <div>
              <h2 className="font-bold">Tickets</h2>
              <ul className="mt-2 ml-7">
                <li className="list-disc mb-1">
                  <Link
                    className="hover:text-black hover:font-semibold"
                    to="/createTicket"
                  >
                    Crear ticket
                  </Link>
                </li>
                <li className="list-disc mb-1">
                  <button className="hover:text-black hover:font-semibold">
                    Ver tickets
                  </button>
                </li>
                <li className="list-disc">
                  <button className="hover:text-black hover:font-semibold">
                    Gestionar tickets
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
