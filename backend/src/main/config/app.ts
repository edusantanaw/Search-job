import express from "express";
import setupRoutest from "../routes/auth-routes";

const app = express();
setupRoutest(app);
export default app;
