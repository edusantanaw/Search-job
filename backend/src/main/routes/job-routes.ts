import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { JobRouterComposer } from "../composers/company/job-router-composer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

export default (router: Router): void => {
  router.post(
    "/job",
    verifyTokenMiddleware,
    adapt(JobRouterComposer.compose().create)
  );
  router.get(
    "/jobs",
    verifyTokenMiddleware,
    adapt(JobRouterComposer.compose().getAll)
  );
  router.get(
    "/job/:id",
    verifyTokenMiddleware,
    adapt(JobRouterComposer.compose().getByid)
  );
  router.patch(
    "/job/:id",
    verifyTokenMiddleware,
    adapt(JobRouterComposer.compose().updateStatus)
  );
};
