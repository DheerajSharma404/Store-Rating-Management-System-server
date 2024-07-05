import { StatusCodes } from "http-status-codes";
import { StoreService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const storeService = new StoreService();

const createStore = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const store = await storeService.createStore(data);
    SuccessResponse.message = "Store created Successfully";
    SuccessResponse.data = store;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

export default {
  createStore,
};
