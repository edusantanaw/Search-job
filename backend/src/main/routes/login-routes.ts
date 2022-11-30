import LoginRouterComposer from "../composers/login-router-composer";
import { Router } from "express";
import adapt from "../adapters/express-router-adapter";

export default (router: Router): void => {
  router.post("/login", adapt(LoginRouterComposer.compose()));
};
