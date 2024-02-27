export const getEnvVariables = () => {
  // import.meta.env
  return {
    // ...import.meta.env
    VITE_USER_SERVICE_URL: import.meta.env.VITE_USER_SERVICE_URL,
    VITE_SECTIONS_SERVICE_URL: import.meta.env.VITE_SECTIONS_SERVICE_URL,
  };
};
