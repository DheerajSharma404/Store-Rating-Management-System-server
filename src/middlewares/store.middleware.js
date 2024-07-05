import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { StoreValidation } from "../validators/index.js";

const validateCreateStoreRequest = (req, res, next) => {
  const validationResult = StoreValidation.storeValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while validating store";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

export default {
  validateCreateStoreRequest,
};
