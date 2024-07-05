import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { UserValidation } from "../validators/index.js";

const userService = new UserService();

const validateUserSignUpRequest = (req, res, next) => {
 
  const validationResult = UserValidation.userSignUpValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while sign up validation.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const validateUserSignInRequest = (req, res, next) => {
  const validationResult = UserValidation.userSignInValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while sign in validation.";
    ErrorResponse.error = new AppError(
      validationResult?.error?.formErrors?.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const checkAuth = async (req, res, next) => {

  try {
    const user = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // Assuming user is set by checkAuth middleware
      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "User not authenticated" });
      }

      if (user.role !== role) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
};

export default {
  validateUserSignInRequest,
  validateUserSignUpRequest,
  checkAuth,
  checkRole,
};
