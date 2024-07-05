import express from "express";
import { StoreController } from "../../controllers/index.js";
import { StoreMiddlewares, UserMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post(
  "/admin-action/create-store",
  StoreMiddlewares.validateCreateStoreRequest,
  UserMiddlewares.checkAuth,
  UserMiddlewares.checkRole("admin"),
  StoreController.createStore
);

export default router;
