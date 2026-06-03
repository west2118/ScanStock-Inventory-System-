export const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        });
      }

      next(error);
    }
  };
};
