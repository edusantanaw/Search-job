import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import { ApplyComposer } from "../composers/candidate/apply-composer";

export default (router: Router): void => {
  router.post("/apply/:id", adapt(ApplyComposer.compose()));
};
