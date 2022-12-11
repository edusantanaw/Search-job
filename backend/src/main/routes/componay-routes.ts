import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import CompanyRegisterCompose from "../composers/company/company-register-composer";

import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import { multerMiddleware } from "../middlewares/multer";

export default (router: Router): void => {
  router.post(
    "/register",
    verifyTokenMiddleware,
    multerMiddleware,
    adapt(CompanyRegisterCompose.compose())
  );
};
