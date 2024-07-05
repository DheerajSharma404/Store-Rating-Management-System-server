import { StatusCodes } from "http-status-codes";
import { RatingService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const ratingService = new RatingService();

const createRating = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const rating = await ratingService.createRating(data, req.params.storeId);
    SuccessResponse.message = "Rating created Successfully";
    SuccessResponse.data = rating;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export default {
  createRating,
};
