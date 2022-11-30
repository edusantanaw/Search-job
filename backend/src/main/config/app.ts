import express from "express";
import setupRoutest from "../routes/login-routes";

const app = express();
setupRoutest(app);
export default app;
