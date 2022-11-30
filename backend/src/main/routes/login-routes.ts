import ExpressRouter from "../adapters/express-router-adapter";
import LoginRouterComposer from "../composers/login-router-composer";
import { Router } from "express";
import ExpressAdapter from "../adapters/express-router-adapter";

const adapt = new ExpressAdapter().adapt;

export default (router: Router): void => {
  router.post("/login", adapt(LoginRouterComposer.compose()));
};
