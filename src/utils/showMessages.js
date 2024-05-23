import Swal from "sweetalert2";

export const showSuccessMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1000,
    customClass: {
      popup: "custom-swal", // Aplica la clase personalizada
      confirmButton: "swal2-confirm",
      cancelButton: "swal2-cancel",
    },
  });
};

export const showErrorMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    text: message,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: "custom-swal", // Aplica la clase personalizada
      confirmButton: "swal2-confirm",
      cancelButton: "swal2-cancel",
    },
  });
};

export const showConfirmDialog = () => {
  return Swal.fire({
    title: "¿Está seguro?",
    icon: "warning",
    showCancelButton: true,
    customClass: {
      popup: "custom-swal", // Aplica la clase personalizada
      confirmButton: "swal2-confirm",
      cancelButton: "swal2-cancel",
    },
    confirmButtonText: "Sí, estoy seguro!",
    cancelButtonText: "Cancelar",
  });
};
