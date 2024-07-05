import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ServerConfig } from "../../config/index.js";

const checkPassword = (plainPassword, encryptedPassword) => {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
};

const createToken = (input) => {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const verifytoken = (token) => {

  try {
   
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {

    throw error;
  }
};

export default {
  checkPassword,
  createToken,
  verifytoken,
};
