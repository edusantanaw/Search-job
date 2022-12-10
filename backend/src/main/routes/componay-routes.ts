import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import CompanyRegisterCompose from "../composers/company/company-register-composer";
import multer from "multer";
import { MulterConfig } from "../middlewares/multer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.post(
    "/register",
    multerMiddleware,
    verifyTokenMiddleware,
    adapt(CompanyRegisterCompose.compose())
  );
};
