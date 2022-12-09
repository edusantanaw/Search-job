import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { CompanyRouterCompose } from "../composers/company/company-router-componser";
import multer from "multer";
import { MulterConfig } from "../middlewares/multer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.post(
    "/register",
    multerMiddleware,
    verifyTokenMiddleware,
    adapt(CompanyRouterCompose.compose().register)
  );
};
