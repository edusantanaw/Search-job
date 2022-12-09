import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { JobRouterComposer } from "../composers/company/job-router-composer";

export default (router: Router): void => {
  router.post("/register", adapt(JobRouterComposer.compose().create));
  router.get("/register", adapt(JobRouterComposer.compose().getAll));
  router.get("/register/:id", adapt(JobRouterComposer.compose().getByid));
  router.patch(
    "/register/:id",
    adapt(JobRouterComposer.compose().updateStatus)
  );
};
