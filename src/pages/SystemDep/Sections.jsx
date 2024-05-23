import { useState } from "react";
import { Companies } from "../../components/sections/company/Companies";
import { Brands } from "../../components/sections/company/Brands";
import { Branches } from "../../components/sections/company/Branches";
import { Cities } from "../../components/sections/company/Cities";
import { Areas } from "../../components/sections/positions/Areas";
import { Subareas } from "../../components/sections/positions/Subareas";
import { Positions } from "../../components/sections/positions/Positions";
import { Processors } from "../../components/sections/pcs/Processors";
import { Ram } from "../../components/sections/pcs/Ram";
import { Disks } from "../../components/sections/pcs/Disks";
import { Models } from "../../components/sections/pcs/Models";
import { Computers } from "../../components/sections/pcs/Computers";
import { Categories } from "../../components/tickets/Categories";
import { TicketsArea } from "../../components/tickets/TicketsArea";

export const Sections = () => {
  const [btnActivated, setBtnActivated] = useState(false);
  const [section, setSection] = useState("");

  const activeBtn = () => {
    setBtnActivated(true);
  };

  return (
    <div className="rounded-lg p-4 text-center text-white bg-gray mx-3">
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
          {section === "processors" && (
            <Processors setBtnActivated={setBtnActivated} />
          )}
          {section === "rams" && <Ram setBtnActivated={setBtnActivated} />}
          {section === "disks" && <Disks setBtnActivated={setBtnActivated} />}
          {section === "models" && <Models setBtnActivated={setBtnActivated} />}
          {section === "computers" && (
            <Computers setBtnActivated={setBtnActivated} />
          )}
          {section === "categories" && (
            <Categories setBtnActivated={setBtnActivated} />
          )}
          {section === "tickets-areas" && (
            <TicketsArea setBtnActivated={setBtnActivated} />
          )}
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="mb-2 font-medium">Configuración de empresas</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("companies");
                }}
              >
                Compañías
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("companyBrands");
                }}
              >
                Marcas
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("cities");
                }}
              >
                Ciudades
              </button>
              <button
                className="btn btn-sm btn-opencars"
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
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("areas");
                }}
              >
                Áreas
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("subareas");
                }}
              >
                Subáreas
              </button>
              <button
                className="btn btn-sm btn-opencars"
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
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("processors");
                }}
              >
                Procesadores
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("rams");
                }}
              >
                Memorias ram
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("disks");
                }}
              >
                Discos
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("models");
                }}
              >
                Modelos
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("computers");
                }}
              >
                Computadoras
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="mb-2 font-medium">Configuración de tickets</h1>
            <hr className="mb-2" />
            <div className="btn-group btn-group-sm flex-wrap gap-1">
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("tickets-areas");
                }}
              >
                Áreas
              </button>
              <button
                className="btn btn-sm btn-opencars"
                onClick={() => {
                  activeBtn();
                  setSection("categories");
                }}
              >
                Categorías
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
