"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = __importDefault(require("../controllers/bookController"));
const bookRouter = (0, express_1.Router)();
bookRouter.get("/", bookController_1.default.getBooks);
bookRouter.get("/:id", bookController_1.default.getBookById);
bookRouter.post("/", bookController_1.default.createBook);
bookRouter.put("/:id", bookController_1.default.updateBook);
bookRouter.delete("/:id", bookController_1.default.deleteBook);
exports.default = bookRouter;
