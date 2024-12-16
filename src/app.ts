import express from "express";
import bookRouter from "./routes/bookRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();

app.use(express.json());

app.use("/api/books", bookRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;