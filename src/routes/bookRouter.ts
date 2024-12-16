import { Router } from "express";
import bookController from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);

bookRouter.get("/:id", bookController.getBookById);

bookRouter.post("/", bookController.createBook);

bookRouter.put("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;