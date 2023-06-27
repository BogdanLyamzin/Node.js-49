const express = require("express");

const authController = require("../../controllers/auth-controller");

const {validateBody} = require("../../decorators");

const {isBodyEmpty, authenticate} = require("../../middlewares/");

const userSchemas = require("../../schemas/user-schemas");

const authRouter = express.Router();

authRouter.post("/signup", isBodyEmpty, validateBody(userSchemas.userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/verify", validateBody(userSchemas.userEmailSchema), authController.resendVerifyEmail);

authRouter.post("/signin", isBodyEmpty, validateBody(userSchemas.userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

module.exports = authRouter;