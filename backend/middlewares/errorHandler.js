export const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.code === "23505") {
    const field = error.detail?.match(/\((.*?)\)/)?.[1] || "Value";

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
