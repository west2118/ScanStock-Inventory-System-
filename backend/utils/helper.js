export const formatZodErrors = (error) => {
  const formatted = {};

  error.errors.forEach((err) => {
    const key = err.path.join(".");
    if (!formatted[key]) {
      formatted[key] = err.message;
    }
  });

  return formatted;
};
