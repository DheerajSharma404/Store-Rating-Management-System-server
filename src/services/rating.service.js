import { StatusCodes } from "http-status-codes";
import { RatingRepository, StoreRepository } from "../repositories/index.js";
import AppError from "../utils/error/app.error.js";

class RatingService {
  constructor() {
    this.ratingRepository = new RatingRepository();
    this.storeRepository = new StoreRepository();
  }

  async createRating(data, storeId) {
    try {
      const store = await this.storeRepository.get(storeId);
      if (!store) {
        throw new AppError("Store does not exist", StatusCodes.NOT_FOUND);
      }
      data.storeId = store._id;

      const rating = await this.ratingRepository.create(data);
      return rating;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while creating Rating.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default RatingService;
