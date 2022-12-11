import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { ApplyComposer } from "../composers/candidate/apply-composer";
import { LoadCandidatesCompose } from "../composers/candidate/loadCandidates-composer";
import { RemoveApplyComposer } from "../composers/candidate/removeApply-composer";

export default (router: Router): void => {
  router.post("/apply/:id", adapt(ApplyComposer.compose()));
  router.get("/apply/:vacancyId", adapt(LoadCandidatesCompose.compose()));
  router.delete("/apply", adapt(RemoveApplyComposer.compose()));
};
