import Swal from "sweetalert2";

export const showSuccessMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1300,
    customClass: {
      title: "my-swal-title-class",
    },
  });
};

export const showErrorMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    text: message,
    showConfirmButton: false,
    timer: 1700,
    customClass: {
      title: "my-swal-title-class",
    },
  });
};

export const showConfirmDialog = () => {
  return Swal.fire({
    title: "¿Está seguro?",
    text: "No podrá revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, estoy seguro!",
    cancelButtonText: "Cancelar",
  });
};
