export const getEnvVariables = () => {
  // import.meta.env
  return {
    // ...import.meta.env
    VITE_BACKEND: import.meta.env.VITE_BACKEND,
  };
};
