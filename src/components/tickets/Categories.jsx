import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import { useCategoriesStore } from "../../hooks/Tickets/useCategoriesStore";
import {
  showConfirmDialog,
  showErrorMessage,
  showSuccessMessage,
} from "../../utils/showMessages";

export const Categories = ({ setBtnActivated }) => {
  const [search, setSearch] = useState("");
  const [addBtn, setAddBtn] = useState(false);
  const { categories, loadingCategories } = useSelector(
    (state) => state.tickets
  );
  const { areas } = useSelector((state) => state.companySection);
  const { startGetAreas } = useAreaSectionStore();
  const { startPostCategory, startGetCategories, startDeleteCategory } =
    useCategoriesStore();

  const filteredCategories = categories.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      category.area.name.toLowerCase().includes(search.toLowerCase())
  );

  const categoriesInitialState = {
    areaID: "",
    categoryName: "",
  };

  const [category, setCategory] = useState(categoriesInitialState);

  const postCategory = async () => {
    try {
      const data = await startPostCategory(category);
      if (data.success) {
        showSuccessMessage(data.message);
        setAddBtn(false);
        setCategory(categoriesInitialState);
        startGetCategories();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const deleteCategory = async (category) => {
    const result = await showConfirmDialog();
    if (result.isConfirmed) {
      try {
        const data = await startDeleteCategory(category._id);
        if (data.success) {
          startGetCategories();
          showSuccessMessage(data.message);
        } else {
          showErrorMessage(data.message);
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    startGetAreas();
    startGetCategories();
  }, []);

  return (
    <>
      <div className="row d-flex flex-wrap justify-content-center align-items-center mb-2">
        <div className="col-3 rounded-lg">
          <button
            onClick={() => setBtnActivated(false)}
            title="Volver"
            className="px-2"
          >
            <i className="ri-arrow-left-circle-line text-3xl text-danger"></i>
          </button>
        </div>
        <div className="col-6">
          {addBtn ? (
            <h1 className="font-medium">Agregar computadora</h1>
          ) : (
            <h1 className="font-medium">Computadoras</h1>
          )}
        </div>
        <div className="col-3 rounded-lg">
          {addBtn ? (
            <button
              onClick={() => {
                setAddBtn(false);
                setCategory(categoriesInitialState);
              }}
              title="Cancelar"
              className="px-2"
            >
              <i className="ri-close-circle-line text-3xl text-danger"></i>
            </button>
          ) : (
            <button
              onClick={() => setAddBtn(true)}
              title="Agregar"
              className="px-2"
            >
              <i className="ri-add-circle-line text-3xl text-success"></i>
            </button>
          )}
        </div>
      </div>
      <hr />
      {addBtn && (
        <div className="my-4 d-flex flex-wrap gap-2 justify-content-center">
          {/* AREA */}
          <select
            className="input-none bg-dark  rounded-lg py-1 px-3 text-white"
            value={category.areaID}
            onChange={(e) =>
              setCategory({ ...category, areaID: e.target.value })
            }
          >
            <option value="" disabled>
              Seleccionar área
            </option>
            {areas.map((area) => (
              <option value={area._id} key={area._id}>
                {area.name}
              </option>
            ))}
          </select>
          {/* CATEGORY */}
          <input
            type="text"
            className="input-none bg-dark  rounded-lg py-1 px-3"
            placeholder="Nombre"
            value={category.categoryName}
            onChange={(e) =>
              setCategory({ ...category, categoryName: e.target.value })
            }
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => postCategory(category)}
          >
            {loadingCategories ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      )}
      <div>
        <div className="input-group input-group-sm my-3 d-flex flex-col align-items-center">
          <div className="rounded-lg py-2 px-3 bg-dark d-flex ">
            <input
              type="text"
              className="border-none outline-none bg-transparent focus:ring-0 text-center w-48"
              placeholder="Buscar"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <i
                className="ri-close-circle-line ml-2 text-danger cursor-pointer"
                onClick={() => setSearch("")}
              ></i>
            )}
          </div>
        </div>
        {loadingCategories ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          <div className="bg-dark p-1 rounded-lg ">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Área</th>
                  <th scope="col">Categoría</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="cursor-pointer"
                    onClick={() => deleteCategory(category)}
                  >
                    <td>{category.area.name}</td>
                    <td>{category.categoryName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
