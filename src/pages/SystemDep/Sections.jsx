import { useState } from "react";
import { Companies } from "../../components/sections/company/Companies";
import { Brands } from "../../components/sections/company/Brands";
import { Branches } from "../../components/sections/company/Branches";
import { Cities } from "../../components/sections/company/Cities";
import { Areas } from "../../components/sections/positions/Areas";
import { Subareas } from "../../components/sections/positions/Subareas";
import { Positions } from "../../components/sections/positions/Positions";

export const Sections = () => {
  const [btnActivated, setBtnActivated] = useState(false);
  const [section, setSection] = useState("");

  const activeBtn = () => {
    setBtnActivated(true);
  };

  return (
    <div className="rounded-lg p-4 text-center text-light inset-black-shadow bg-gray">
      {btnActivated ? (
        <div className="text-center">
          {section === "companies" && (
            <Companies setBtnActivated={setBtnActivated} />
          )}
          {section === "companyBrands" && (
            <Brands setBtnActivated={setBtnActivated} />
          )}
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
                  setSection("companyBrands");
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
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de puestos</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
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
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de PC's</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("computerBrands");
                }}
              >
                Marcas
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("disks");
                }}
              >
                Discos
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("memories");
                }}
              >
                Memorias
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("models");
                }}
              >
                Modelos
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("types");
                }}
              >
                Tipos
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("processors");
                }}
              >
                Procesadores
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de celulares</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
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
                  setSection("models");
                }}
              >
                Modelos
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("plans");
                }}
              >
                Planes
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de redes</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("types");
                }}
              >
                Tipo de dispositivos
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("devices");
                }}
              >
                Dispositivos
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de líneas</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("types");
                }}
              >
                Tipo de líneas
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de tickets</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
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
                  setSection("categories");
                }}
              >
                Categorías
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  activeBtn();
                  setSection("subcategories");
                }}
              >
                Subcategorías
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
