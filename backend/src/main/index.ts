import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));

export default app;
