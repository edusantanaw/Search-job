import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { LoadUserByIdComposer } from "../composers/user/loadUserById-Composer";

import multer from "multer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
import { LoadAllUsersComposer } from "../composers/user/LoadAllUsers-Composer";
import { UpdateUserComposer } from "../composers/user/updateUser-Composer";
import { multerMiddleware } from "../middlewares/multer";

export default (router: Router): void => {
  router.get(
    "/users",
    verifyTokenMiddleware,
    adapt(LoadAllUsersComposer.compose())
  );
  router.get(
    "/user/:id",
    verifyTokenMiddleware,
    adapt(LoadUserByIdComposer.compose())
  );
  router.patch(
    "/user/update/:id",
    multerMiddleware,
    verifyTokenMiddleware,
    adapt(UpdateUserComposer.compose())
  );
};
