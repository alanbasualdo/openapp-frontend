import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/Users/useUserStore";
import { useSelector } from "react-redux";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";
import { useBranchSectionStore } from "../../hooks/CompanySections/useBranchSectionStore";
import { usePositionSectionStore } from "../../hooks/PositionsSections/usePositionSectionStore";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import { useSubareaSectionStore } from "../../hooks/PositionsSections/useSubareaSectionStore";
import { useFileDropzone } from "../../hooks/Users/useFileDropzone";

export const ManageUsers = ({ createUserClick, setCreateUserClick }) => {
  const { userLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { branches, positions, areas, subareas } = useSelector(
    (state) => state.companySection
  );
  const { startCreateUser, startGetUsers } = useUserStore();
  const [seePassword, setSeePassword] = useState(false);
  const [seeSecondPassword, setSeeSecondPassword] = useState(false);
  const [secondPassword, setSecondPassword] = useState("");
  const { startGetBranches } = useBranchSectionStore();
  const { startGetPositions } = usePositionSectionStore();
  const { startGetAreas } = useAreaSectionStore();
  const { startGetSubareas } = useSubareaSectionStore();
  const [files, setFiles] = useState([]);
  const { getRootPropsFile, getInputPropsFile, isDragActiveFile, removeFile } =
    useFileDropzone("userPhoto", files, setFiles);

  const initialStateUserData = {
    name: "",
    lastName: "",
    cuil: "",
    birthdate: "",
    gender: "",
    userName: "",
    email: "",
    password: "",
    admissionDate: "",
    departureDate: "",
    payroll: "",
    branch: "",
    area: "",
    subarea: "",
    position: "",
  };

  const [userData, setUserData] = useState(initialStateUserData);

  const resetForm = () => {
    setUserData(initialStateUserData);
    setFiles([]);
    setSeePassword(false);
    setSeeSecondPassword(false);
  };

  const createUser = async () => {
    try {
      const data = await startCreateUser(userData, files);
      if (data.success) {
        showSuccessMessage(data.message);
        setCreateUserClick(false);
        resetForm();
        startGetUsers();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    startGetBranches();
    startGetPositions();
    startGetAreas();
    startGetSubareas();
  }, []);

  return (
    <div>
      <h1 className="text-white font-bold text-md mb-4">Creación de usuario</h1>
      <div className="d-flex gap-3 justify-center align-center">
        <div className="col-6">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <h1 className="text-white font-medium text-md">
              Datos corporativos
            </h1>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Usuario
              </span>
              <input
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Email
              </span>
              <input
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Contraseña
              </span>
              <input
                type={seePassword ? "text" : "password"}
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                title={seePassword ? "Ocultar" : "Ver"}
                onClick={() => setSeePassword(!seePassword)}
              >
                {seePassword ? (
                  <i className="ri-eye-off-line text-white"></i>
                ) : (
                  <i className="ri-eye-line text-white"></i>
                )}
              </button>
            </div>

            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Repetir contraseña
              </span>
              <input
                type={seeSecondPassword ? "text" : "password"}
                className={`form-control input-none bg-dark rounded-lg py-1 px-3 text-white ${
                  userData.password !== secondPassword && "border-red-500"
                }`}
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                title={seeSecondPassword ? "Ocultar" : "Ver"}
                onClick={() => setSeeSecondPassword(!seeSecondPassword)}
              >
                {seeSecondPassword ? (
                  <i className="ri-eye-off-line text-white"></i>
                ) : (
                  <i className="ri-eye-line text-white"></i>
                )}
              </button>
            </div>
            {userData.password !== secondPassword && (
              <div className="text-xs text-red-500">
                Las contraseñas no coinciden
              </div>
            )}
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Fecha de ingreso
              </span>
              <input
                type="date"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.admissionDate}
                onChange={(e) =>
                  setUserData({ ...userData, admissionDate: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Nómina
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.payroll}
                onChange={(e) =>
                  setUserData({ ...userData, payroll: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar nómina
                </option>
                <option value="Fortecar">Fortecar</option>
                <option value="Granville">Granville</option>
                <option value="Pampawagen">Pampawagen</option>
                <option value="Opencars">Opencars</option>
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Área
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.area}
                onChange={(e) =>
                  setUserData({ ...userData, area: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar área
                </option>
                {areas.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Subárea
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.subarea}
                onChange={(e) =>
                  setUserData({ ...userData, subarea: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar subárea
                </option>
                {subareas.map((subarea) => (
                  <option key={subarea._id} value={subarea._id}>
                    {subarea.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Sucursal
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.branch}
                onChange={(e) =>
                  setUserData({ ...userData, branch: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar sucursal
                </option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.brand} - {branch.company} - {branch.province} -{" "}
                    {branch.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Posición
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.position}
                onChange={(e) =>
                  setUserData({ ...userData, position: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar posiciónes
                </option>
                {positions.map((position) => (
                  <option key={position._id} value={position._id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <h1 className="text-white font-medium text-md">Datos personales</h1>
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col">
                {files.length > 0 ? (
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="d-flex flex-column align-items-center gap-1"
                      >
                        {!file.type.startsWith("image/") ? (
                          <>
                            <i className="ri-file-text-fill text-5xl text-dark"></i>
                            <a
                              href={URL.createObjectURL(file)}
                              download={file.name}
                              className="text-xs"
                            >
                              {file.name.length > 20
                                ? file.name.slice(0, 20) + "..."
                                : file.name}
                            </a>
                          </>
                        ) : (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="rounded-lg w-44 h-auto"
                          />
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger input-none"
                          type="button"
                          onClick={() => removeFile(index)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    {...getRootPropsFile()}
                    className="bg-dark rounded-lg p-3 cursor-pointer hover:border text-sm text-center flex items-center justify-center h-52 w-80"
                  >
                    <input {...getInputPropsFile()} className="hidden" />
                    {isDragActiveFile ? (
                      <p className="text-center m-0">
                        Suelte los archivos aquí...
                      </p>
                    ) : (
                      <p className="text-center m-0">
                        Arrastre y suelte aquí la foto, o haz clic para
                        seleccionar
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Nombre/s
              </span>
              <input
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Apellido/s
              </span>
              <input
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                CUIL
              </span>
              <input
                type="number"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.cuil}
                onChange={(e) =>
                  setUserData({ ...userData, cuil: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Fecha de nacimiento
              </span>
              <input
                type="date"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.birthdate}
                onChange={(e) =>
                  setUserData({ ...userData, birthdate: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <label className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none">
                Género
              </label>
              <select
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar género
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-sm btn-success"
          onClick={() => createUser()}
          disabled={userLoading}
        >
          {userLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          ) : (
            "Crear usuario"
          )}
        </button>
      </div>
    </div>
  );
};
