import LoginRouterComposer from "../composers/signin-router-composer";
import { Router } from "express";
import SigninRouterComposer from "../composers/signup-router-composer";
import adapt from "../adapters/express-router-adapter";
import multer from "multer";
import { MulterConfig } from "../middlewares/multer";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.post(
    "/signup",
    adapt(SigninRouterComposer.compose())
  );
  router.post(
    "/signin",
    adapt(LoginRouterComposer.compose())
  );
};
