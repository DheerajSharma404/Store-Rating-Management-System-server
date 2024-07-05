import { StatusCodes } from "http-status-codes";
import { StoreRepository } from "../repositories/index.js";
import AppError from "../utils/error/app.error.js";

class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }

  async createStore(data) {

    try {
      const { email } = data;
      const existingStore = await this.storeRepository.findByEmail(email); //Eamil is unique in store.
      if (existingStore) {
        throw new AppError(
          "Store with the email already exist",
          StatusCodes.CONFLICT
        );
      }
      const newStore = await this.storeRepository.create(data);
      return newStore;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while create store",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default StoreService;
