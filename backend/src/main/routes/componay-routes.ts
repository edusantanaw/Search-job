import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { CompanyRouterCompose } from "../composers/company/company-router-componser";

export default (router: Router): void => {
  router.post("/register", adapt(CompanyRouterCompose.compose().register));
};
