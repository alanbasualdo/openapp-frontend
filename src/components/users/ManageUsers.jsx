import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/Users/useUserStore";
import { useSelector } from "react-redux";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";
import { useBranchSectionStore } from "../../hooks/CompanySections/useBranchSectionStore";
import { usePositionSectionStore } from "../../hooks/PositionsSections/usePositionSectionStore";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import { useSubareaSectionStore } from "../../hooks/PositionsSections/useSubareaSectionStore";
import { useFileDropzone } from "../../hooks/Users/useFileDropzone";
import { getEnvVariables } from "../../helpers/getEnvVariables";

export const ManageUsers = ({
  selectedUser,
  setCreateUser,
  setSelectedUser,
}) => {
  const { userLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { branches, positions, areas, subareas } = useSelector(
    (state) => state.companySection
  );
  const { startCreateUser, startGetUsers, startPutUser } = useUserStore();
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
  const { VITE_BACKEND } = getEnvVariables();
  const [havePhone, setHavePhone] = useState(false);

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
    area: "",
    subarea: "",
    branch: "",
    position: "",
    phoneNumber: "",
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
        setCreateUser(false);
        resetForm();
        startGetUsers();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const updateUser = async () => {
    try {
      const data = await startPutUser(selectedUser._id, userData, files);
      if (data.success) {
        showSuccessMessage(data.message);
        setCreateUser(false);
        setSelectedUser(null);
        resetForm();
        startGetUsers();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.response.data.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  useEffect(() => {
    startGetBranches();
    startGetPositions();
    startGetAreas();
    startGetSubareas();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const formattedUser = {
        ...selectedUser,
        birthdate: selectedUser.birthdate
          ? selectedUser.birthdate.split("T")[0]
          : "",
        admissionDate: selectedUser.admissionDate
          ? selectedUser.admissionDate.split("T")[0]
          : "",
        departureDate: selectedUser.departureDate
          ? selectedUser.departureDate.split("T")[0]
          : "",
        position: selectedUser.position._id,
        area: selectedUser.area._id,
        subarea: selectedUser.subarea._id,
        phoneNumber: selectedUser.phoneNumber || "",
      };
      setUserData(formattedUser);
      setHavePhone(!!selectedUser.phoneNumber);
    } else {
      setUserData(initialStateUserData);
      setHavePhone(false);
    }
  }, [selectedUser]);

  return (
    <div>
      <h1 className="text-white font-bold text-md mb-2">
        {selectedUser ? "Modificación de usuario" : "Creación de usuario"}
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <div className="order-1">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <h1 className="text-white font-medium text-md w-full text-center">
              Datos personales
            </h1>
            <div className="flex items-center justify-center w-full">
              {selectedUser ? (
                <div className="w-full mb-2 flex items-center justify-center">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img
                      className="rounded-lg h-72 hover:opacity-50 transition-opacity duration-300"
                      src={`${VITE_BACKEND}/uploads/${selectedUser.userPhoto}`}
                      alt={selectedUser.userPhoto}
                      title={selectedUser.userPhoto}
                    />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
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
                      <input
                        {...getInputPropsFile()}
                        className="hidden"
                        name="files-input"
                      />
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
              )}
            </div>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Nombre/s
              </span>
              <input
                name="name-input"
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
                name="lastName-input"
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
                name="cuil-input"
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
                name="birthdate-input"
                type="date"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.birthdate}
                onChange={(e) =>
                  setUserData({ ...userData, birthdate: e.target.value })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="gender-select"
              >
                Género
              </label>
              <select
                id="gender-select"
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
        <div className="order-2">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <h1 className="text-white font-medium text-md w-full text-center">
              Datos corporativos
            </h1>
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Usuario
              </span>
              <input
                name="files-userName"
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
                name="files-email"
                type="text"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            {!selectedUser && (
              <>
                <div className="input-group input-group-sm w-full">
                  <span className="input-group-text font-medium bg-dark text-white input-none">
                    Contraseña
                  </span>
                  <input
                    name="password-input"
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
                    name="rpassword-input"
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
              </>
            )}
            <div className="input-group input-group-sm w-full">
              <span className="input-group-text font-medium bg-dark text-white input-none">
                Fecha de ingreso
              </span>
              <input
                name="admissionDate-input"
                type="date"
                className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                value={userData.admissionDate}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    admissionDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group input-group-sm w-full">
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="payroll-select"
              >
                Nómina
              </label>
              <select
                id="payroll-select"
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
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="area-select"
              >
                Área
              </label>
              <select
                id="area-select"
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={selectedUser ? selectedUser.area._id : userData.area}
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
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="subarea-select"
              >
                Subárea
              </label>
              <select
                id="subarea-select"
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
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="branch-select"
              >
                Sucursal
              </label>
              <select
                id="branch-select"
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.branch}
                onChange={(e) =>
                  setUserData({ ...userData, branch: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar posiciones
                </option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.company} - {branch.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <label
                className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                htmlFor="position-select"
              >
                Posición
              </label>
              <select
                id="position-select"
                className="form-select input-none bg-dark rounded-lg py-1 px-3 text-white input-none bg-dark"
                value={userData.position}
                onChange={(e) =>
                  setUserData({ ...userData, position: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccionar posiciones
                </option>
                {positions.map((position) => (
                  <option key={position._id} value={position._id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-sm w-full">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-dark input-none p-0 w-full">
                  <label
                    className="input-group-text text-sm font-medium bg-dark text-white input-none bg-dark input-none col-10 px-2"
                    htmlFor="phoneNumber-check"
                  >
                    ¿Tiene celular corporativo?
                  </label>
                  <div className="form-check form-switch col-2 flex items-center justify-center">
                    <input
                      id="phoneNumber-check"
                      className="form-check-input input-sm"
                      type="checkbox"
                      role="switch"
                      checked={havePhone}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setHavePhone(checked);
                        if (!checked) {
                          setUserData({ ...userData, phoneNumber: "" });
                        }
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>
            {havePhone && (
              <div className="input-group input-group-sm w-full">
                <label
                  className="input-group-text font-medium bg-dark text-white input-none bg-dark input-none"
                  htmlFor="phoneNumber-input"
                >
                  Número
                </label>
                <input
                  id="phoneNumber-input"
                  type="number"
                  className="form-control input-none bg-dark rounded-lg py-1 px-3 text-white"
                  value={userData.phoneNumber || ""}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        {selectedUser ? (
          <button
            className="btn btn-sm btn-success"
            onClick={updateUser}
            disabled={userLoading}
          >
            {userLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              "Modificar"
            )}
          </button>
        ) : (
          <button
            className="btn btn-sm btn-success"
            onClick={createUser}
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
        )}
      </div>
    </div>
  );
};
