import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { CreateJobComposer } from "../composers/job/create-job-composer";
import LoadAllJobsComposer from "../composers/job/loadAllCompanyComposer";
import { LoadJobByIdComposer } from "../composers/job/loadById-composer";
import { LoadJobsByNameComposer } from "../composers/job/loadByNameComposer";
import { UpdateJobComposer } from "../composers/job/updatedStatus-composer";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

export default (router: Router): void => {
  router.post(
    "/job",
    verifyTokenMiddleware,
    adapt(CreateJobComposer.compose())
  );
  router.get(
    "/jobs",
    verifyTokenMiddleware,
    adapt(LoadAllJobsComposer.compose())
  );
  router.get(
    "/jobs/search",
    verifyTokenMiddleware,
    adapt(LoadJobsByNameComposer.compose())
  );
  router.get(
    "/job/:id",
    verifyTokenMiddleware,
    adapt(LoadJobByIdComposer.compose())
  );
  router.patch(
    "/job/:id",
    verifyTokenMiddleware,
    adapt(UpdateJobComposer.compose())
  );
};
