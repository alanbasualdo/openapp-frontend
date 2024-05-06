import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const useFileDropzone = (files, setFiles) => {
  const onDropFiles = useCallback((acceptedFiles) => {
    const allowedTypes = [
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

    const invalidFiles = acceptedFiles.filter(
      (file) => !allowedTypes.some((type) => file.type.includes(type))
    );

    if (invalidFiles.length > 0) {
      const allowedFileTypes = [
        "imágenes",
        "PDF",
        "Word",
        "Excel",
        "PowerPoint",
        "archivos de texto",
        "videos MP4",
        "videos AVI",
        "videos FLV",
        "videos WEBM",
        "videos MOV",
        "videos WMV",
      ];
      const allowedFileTypesText = allowedFileTypes.join(", ");

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Solo se permiten ${allowedFileTypesText}.`,
      });
    } else {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }
  }, []);

  const removeFile = (files, setFiles, index) => {
    const updatedFileList = files.slice();
    updatedFileList.splice(index, 1);
    setFiles(updatedFileList);
  };

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
    removeFile: (index) => removeFile(files, setFiles, index),
  };
};
