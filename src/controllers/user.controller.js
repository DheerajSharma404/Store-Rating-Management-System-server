import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const userService = new UserService();

const signUp = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    SuccessResponse.message = "User successfully signed up.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userService.signIn(req.body);
    SuccessResponse.message = "User successfully signed in.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

const signOut = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email);

    SuccessResponse.message = "User successfully signed out.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error?.statusCode).json(ErrorResponse);
  }
};

const validateUser = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email);
    SuccessResponse.message = "User successfully validated.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error?.message;
    return res.status(error?.statusCode).json(ErrorResponse);
  }
};

export default {
  signUp,
  signIn,
  signOut,
  validateUser,
};
