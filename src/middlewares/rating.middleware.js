import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import { RatingValidation } from "../validators/index.js";

const validateCreateRatingRequest = (req, res, next) => {
  const validationResult = RatingValidation.ratingValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong whild validating rating.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

export default {
  validateCreateRatingRequest,
};
