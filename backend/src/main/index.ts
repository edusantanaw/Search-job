import express from "express";
const app = express();
import router from "./config/routes";
import cors from "cors";

app.use(cors({ credentials: true, origin: "" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
router(app);
const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));

export default app;
