import SignComposer from "../composers/auth/signin-router-composer";
import { Router } from "express";
import adapt from "../adapters/express-router-adapter";
import SignupComposer from "../composers/auth/signup-router-composer";

export default (router: Router): void => {
  router.post("/signup", adapt(SignComposer.compose()));
  router.post("/signin", adapt(SignupComposer.compose()));
};
