const express = require("express");

const authController = require("../../controllers/auth-controller");

const {validateBody} = require("../../decorators");

const {isBodyEmpty} = require("../../middlewares/");

const userSchemas = require("../../schemas/user-schemas");

const authRouter = express.Router();

authRouter.post("/signup", isBodyEmpty, validateBody(userSchemas.userSignupSchema),  authController.signup);

authRouter.post("/signin", isBodyEmpty, validateBody(userSchemas.userSigninSchema), authController.signin);

module.exports = authRouter;