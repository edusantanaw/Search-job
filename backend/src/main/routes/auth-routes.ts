import AuthRouterComposer from "../composers/auth/auth-router-composer";
import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import multer from "multer";
import { MulterConfig } from "../middlewares/multer";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.post("/signup", adapt(AuthRouterComposer.compose().signup));
  router.post("/signin", adapt(AuthRouterComposer.compose().signin));
};
