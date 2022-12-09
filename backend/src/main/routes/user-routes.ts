import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { UserRouterComposer } from "../composers/user/user-router-composer";

import multer from "multer";
import { MulterConfig } from "../middlewares/multer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const multerMiddleware = multer(MulterConfig).single("file");

export default (router: Router): void => {
  router.get(
    "/users",
    verifyTokenMiddleware,
    adapt(UserRouterComposer.compose().getAll)
  );
  router.get(
    "/user/:id",
    verifyTokenMiddleware,
    adapt(UserRouterComposer.compose().getById)
  );
  router.patch(
    "/user/update/:id",
    multerMiddleware,
    verifyTokenMiddleware,
    adapt(UserRouterComposer.compose().update)
  );
};
