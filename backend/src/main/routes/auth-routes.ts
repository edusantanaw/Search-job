import AuthRouterComposer from "../composers/auth/signin-router-composer";
import { Router } from "express";
import adapt from "../adapters/express-router-adapter";

export default (router: Router): void => {
  router.post("/signup", adapt(AuthRouterComposer.compose()));
  // router.post("/signin", adapt(AuthRouterComposer.compose()));
};
