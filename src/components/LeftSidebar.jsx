export const LeftSidebar = ({ showLeftbar }) => {
  return (
    <>
      {showLeftbar && (
        <div
          className="offcanvas-end show bg-blue-600 text-white relative w-50"
          style={{ height: "calc(100vh - 60px)" }}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="p-3">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Submenú
              </h5>
            </div>
            <div className="offcanvas-body">
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
