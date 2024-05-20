import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import moment from "moment";
import { useUserStore } from "../../hooks/Users/useUserStore";

export const UserView = ({ selectedUser, setSelectedUser }) => {
  const cancelButtonRef = useRef(null);
  const { VITE_BACKEND } = getEnvVariables();
  const { startPutUser } = useUserStore();

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    if (file) {
      console.log(file.name); // Ejemplo de acción con el archivo
      // Puedes implementar aquí la lógica para procesar o mostrar el archivo
    }
  };

  const handleDateChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      userName: e.target.value,
      email: e.target.value,
      admissionDate: e.target.value,
    });
  };

  const putUser = async () => {
    const resp = await startPutUser();
  };

  return (
    <>
      <Transition.Root show={selectedUser} as={Fragment}>
        <Dialog
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setSelectedUser(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-gray transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl text-white">
                  <div className="p-3">
                    <div className="text-xs text-gray-400">
                      ID {selectedUser._id}
                    </div>
                    <hr className="my-2" />
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <div className="order-2 sm:order-1 w-full">
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Usuario
                          </div>
                          <input
                            className="input-none px-2 text-sm"
                            value={selectedUser.userName}
                            type="text"
                            onChange={handleDateChange}
                          />
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Email
                          </div>
                          <input
                            className="input-none px-2 text-sm"
                            value={selectedUser.email}
                            type="text"
                            onChange={handleDateChange}
                          />
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Fecha de ingreso
                          </div>
                          <input
                            className="input-none px-2 text-sm"
                            value={moment
                              .utc(selectedUser.admissionDate)
                              .format("DD-MM-YYYY")}
                            type="date"
                            onChange={handleDateChange}
                          />
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Nómina
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.payroll}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Área
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.area.name}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Subárea
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.subarea.name}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Posición
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.position.name}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                      </div>
                      <div className="order-1 sm:order-2 w-full">
                        <div className="w-full mb-2 flex items-center justify-center">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            {selectedUser.userPhoto ? (
                              <img
                                className="rounded-lg h-72 hover:opacity-50 transition-opacity duration-300 object-cover"
                                src={`${VITE_BACKEND}/uploads/${selectedUser.userPhoto}`}
                                alt={selectedUser.userPhoto}
                                title={selectedUser.userPhoto}
                              />
                            ) : (
                              <img
                                className="rounded-lg h-72 hover:opacity-50 transition-opacity duration-300 object-cover"
                                src={`${VITE_BACKEND}/uploads/user.png`}
                                alt={selectedUser.userPhoto}
                                title={selectedUser.userPhoto}
                              />
                            )}
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Nombre/s
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.name}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Apellido/s
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.lastName}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            CUIL
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.cuil}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Fecha de nacimiento
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {moment
                              .utc(selectedUser.birthdate)
                              .format("DD/MM/YYYY")}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Género
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.gender}
                            <i className="ri-pencil-fill text-gray-400 hover:text-gray-300 cursor-pointer ml-1"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between w-full font-medium">
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-400"
                        onClick={() => setSelectedUser(null)}
                        ref={cancelButtonRef}
                      >
                        Desactivar
                      </button>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="text-gray-50 hover:text-gray-300"
                          onClick={() => setSelectedUser(null)}
                          ref={cancelButtonRef}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
