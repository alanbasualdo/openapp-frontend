export const getEnvVariables = () => {
  // import.meta.env
  return {
    // ...import.meta.env
    VITE_USER_SERVICE_URL: import.meta.env.VITE_USER_SERVICE_URL,
    VITE_AUTH_SERVICE_URL: import.meta.env.VITE_AUTH_SERVICE_URL,
  };
};
