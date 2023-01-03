const { Router } = require("express");
const AuthController = require('../Controllers/authController');
const { UserSignupValidationMW } = require("../validators/validator");

const authRouter = Router();

authRouter.get("/signup", AuthController.signupPage);
authRouter.post("/signup",UserSignupValidationMW, AuthController.signup);
authRouter.get("/login", AuthController.loginPage);
authRouter.post("/login", AuthController.login);

module.exports = authRouter;