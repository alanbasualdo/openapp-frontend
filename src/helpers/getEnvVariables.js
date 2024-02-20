export const getEnvVariables = () => {
  // import.meta.env
  return {
    // ...import.meta.env
    USER_SERVICE_URL: import.meta.env.USER_SERVICE_URL,
  };
};
