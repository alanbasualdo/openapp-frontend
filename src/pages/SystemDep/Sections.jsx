import { useState } from "react";
import { Companies } from "../../components/sections/company/Companies";
import { Brands } from "../../components/sections/company/Brands";
import { Branches } from "../../components/sections/company/Branches";
import { Cities } from "../../components/sections/company/Cities";
import { Areas } from "../../components/sections/company/Areas";
import { Subareas } from "../../components/sections/company/Subareas";
import { Positions } from "../../components/sections/company/Positions";

export const Sections = () => {
  const [btnActivated, setBtnActivated] = useState(false);
  const [section, setSection] = useState("");

  const activeBtn = () => {
    setBtnActivated(true);
  };

  return (
    <div
      className="bg-white rounded-lg p-3 mt-2 text-dark"
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.7)" }}
    >
      {btnActivated ? (
        <div className="text-center">
          {section === "companies" && (
            <Companies setBtnActivated={setBtnActivated} />
          )}
          {section === "brands" && <Brands setBtnActivated={setBtnActivated} />}
          {section === "cities" && <Cities setBtnActivated={setBtnActivated} />}
          {section === "branches" && (
            <Branches setBtnActivated={setBtnActivated} />
          )}
          {section === "areas" && <Areas setBtnActivated={setBtnActivated} />}
          {section === "subareas" && (
            <Subareas setBtnActivated={setBtnActivated} />
          )}
          {section === "positions" && (
            <Positions setBtnActivated={setBtnActivated} />
          )}
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="mb-2 font-medium">Configuración de empresas</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("companies");
                }}
              >
                Compañías
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("brands");
                }}
              >
                Marcas
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("cities");
                }}
              >
                Ciudades
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("branches");
                }}
              >
                Sucursales
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("areas");
                }}
              >
                Áreas
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("subareas");
                }}
              >
                Subáreas
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("positions");
                }}
              >
                Puestos
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};