const { Router } = require("express");
const AuthController = require('../Controllers/authController');

const authRouter = Router();

authRouter.get("/signup", AuthController.signupPage);
authRouter.post("/signup", AuthController.signup);
authRouter.get("/login", AuthController.loginPage);
authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.log_out);

module.exports = authRouter;