import express from "express";
const app = express();
import router from './config/routes'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
router(app)
const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));

export default app;
