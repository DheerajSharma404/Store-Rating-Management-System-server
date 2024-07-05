import express from "express";
import { UserController } from "../../controllers/index.js";
import { UserMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post(
  "/sign-up",
  UserMiddlewares.validateUserSignUpRequest,
  UserController.signUp
);

router.post(
  "/sign-in",
  UserMiddlewares.validateUserSignInRequest,
  UserController.signIn
);
router.post("/sign-out", UserMiddlewares.checkAuth, UserController.signOut);

router.post(
  "/validate-token",
  UserMiddlewares.checkAuth,
  UserController.validateUser
);

router.post(
  "/admin-action/create-user",
  UserMiddlewares.validateUserSignUpRequest,
  UserMiddlewares.checkAuth,
  UserMiddlewares.checkRole("admin"),
  UserController.signUp
);

export default router;
