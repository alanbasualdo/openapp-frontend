import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export const useFileDropzone = (typeOfFile, files, setFiles) => {
  const onDropFiles = useCallback(
    (acceptedFiles) => {
      let allowedTypes;
      if (typeOfFile === "userPhoto") {
        allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      } else {
        allowedTypes = [
          "image/",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PowerPoint
          "text/plain",
          "video/mp4", // Video MP4
          "video/x-msvideo", // Video AVI
          "video/x-flv", // Video FLV
          "video/webm", // Video WEBM
          "video/quicktime", // Video MOV
          "video/x-ms-wmv", // Video WMV
        ];
      }

      const invalidFiles = acceptedFiles.filter(
        (file) => !allowedTypes.some((type) => file.type.includes(type))
      );

      if (invalidFiles.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Solo se permiten archivos de tipo: ${allowedTypes
            .map((type) => type.split("/").pop())
            .join(", ")}.`,
        });
      } else {
        // If "userPhoto", limit to only one file
        if (typeOfFile === "userPhoto") {
          if (acceptedFiles.length > 1) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Solo se puede subir una foto de usuario.",
            });
          } else {
            setFiles([acceptedFiles[0]]); // Set a single file only
          }
        } else {
          setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        }
      }
    },
    [typeOfFile, setFiles]
  );

  const removeFile = useCallback(
    (index) => {
      const updatedFileList = files.slice();
      updatedFileList.splice(index, 1);
      setFiles(updatedFileList);
    },
    [files, setFiles]
  );

  const {
    getRootProps: getRootPropsFile,
    getInputProps: getInputPropsFile,
    isDragActive: isDragActiveFile,
  } = useDropzone({
    onDrop: onDropFiles,
  });

  return {
    getRootPropsFile,
    getInputPropsFile,
    isDragActiveFile,
    removeFile,
  };
};
