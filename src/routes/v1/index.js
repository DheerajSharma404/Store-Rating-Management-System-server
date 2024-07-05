import express from "express";
import ratingRoutes from "./rating.routes.js";
import storeRoutes from "./store.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/rating", ratingRoutes);

export default router;
