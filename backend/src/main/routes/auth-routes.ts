import LoginRouterComposer from "../composers/auth/signin-router-composer";
import { Router } from "express";
import SigninRouterComposer from "../composers/auth/signup-router-composer";
import adapt from "../adapters/express-router-adapter";
import multer from "multer";
import { MulterConfig } from "../middlewares/multer";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.post("/signup", adapt(SigninRouterComposer.compose().signup));
  router.post("/signin", adapt(LoginRouterComposer.compose().signin));
};
