import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { UserRouterComposer } from "../composers/user/user-router-composer";

export default (router: Router): void => {
  router.get("/users", adapt(UserRouterComposer.compose().getAll));
  router.get("/user/:id", adapt(UserRouterComposer.compose().getById));
  router.patch("/user/update/:id", adapt(UserRouterComposer.compose().update));
};
