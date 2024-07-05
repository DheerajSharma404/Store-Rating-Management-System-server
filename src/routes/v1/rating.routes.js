import express from "express";
import { RatingController } from "../../controllers/index.js";
import { RatingMiddlewares, UserMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post(
  "/create-rating/:storeId",
  RatingMiddlewares.validateCreateRatingRequest,
  UserMiddlewares.checkAuth,
  UserMiddlewares.checkRole("normal"),
  RatingController.createRating
);

export default router;
