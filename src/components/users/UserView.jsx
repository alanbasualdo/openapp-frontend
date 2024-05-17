import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getEnvVariables } from "../../helpers/getEnvVariables";

export const UserView = ({ selectedUser, setSelectedUser }) => {
  const cancelButtonRef = useRef(null);
  const { VITE_BACKEND } = getEnvVariables();

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
                <Dialog.Panel className="relative bg-gray transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl text-white">
                  <div className="p-3">
                    <div className="text-xs text-gray-400">
                      ID {selectedUser._id}
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex gap-3 justify-center align-center">
                      <div className="col-6">
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Usuario
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.userName}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Email
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.email}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Fecha de ingreso
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.admissionDate}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Nómina
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.payroll}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Área
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.area.name}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Subárea
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.subarea.name}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Posición
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.position.name}
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="w-full mb-2 flex items-center justify-center">
                          <img
                            className="rounded-lg h-60"
                            src={`${VITE_BACKEND}/uploads/${selectedUser.userPhoto}`}
                            alt={selectedUser.userPhoto}
                            title={selectedUser.userPhoto}
                          />
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Nombre/s
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.name}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Apellido/s
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.lastName}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            CUIL
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.cuil}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Fecha de nacimiento
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.birthdate}
                          </p>
                        </div>
                        <div className="w-full mb-2">
                          <div className="py-1 px-2 w-full text-xs font-medium bg-dark rounded-md">
                            Género
                          </div>
                          <p className="px-2 py-1 text-sm">
                            {selectedUser.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex flex-row-reverse gap-3">
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-400"
                        onClick={() => setSelectedUser(null)}
                        ref={cancelButtonRef}
                      >
                        Desactivar
                      </button>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
