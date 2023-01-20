export const getEnvironments = () => {
  const data = import.meta.env;
  import.meta?.env;

  return {
    ...import.meta.env,
  };
};
