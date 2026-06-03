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

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
