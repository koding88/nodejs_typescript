"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbPrismaService_1 = __importDefault(require("../services/dbPrismaService"));
const errorHandle_1 = __importDefault(require("../services/errorHandle"));
const zodSchema_1 = require("../zodSchema");
class BookController {
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield dbPrismaService_1.default.getBooks();
                res.status(200).json(books);
            }
            catch (error) {
                const { status, message } = errorHandle_1.default.handleError(error);
                res.status(status).send(message);
            }
        });
    }
    getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const book = yield dbPrismaService_1.default.getBookById(Number(id));
                res.status(200).json(book);
            }
            catch (error) {
                const { status, message } = errorHandle_1.default.handleError(error);
                res.status(status).send(message);
            }
        });
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = zodSchema_1.CreateBookSchema.safeParse(req.body);
            if (book.success) {
                try {
                    const createdBook = yield dbPrismaService_1.default.insertBook(book.data);
                    res.status(201).json(createdBook);
                }
                catch (error) {
                    const { status, message } = errorHandle_1.default.handleError(error);
                    res.status(status).send(message);
                }
            }
            else {
                res.status(400).send(book.error.message);
            }
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const book = zodSchema_1.UpdateBookSchema.safeParse(req.body);
            if (book.success) {
                const updates = book.data;
                try {
                    const updateBook = yield dbPrismaService_1.default.updateBookById(Number(id), updates);
                    res.status(200).json(updateBook);
                }
                catch (error) {
                    const { status, message } = errorHandle_1.default.handleError(error);
                    res.status(status).send(message);
                }
            }
            else {
                res.status(400).send(book.error.message);
            }
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield dbPrismaService_1.default.deleteBookById(Number(id));
                res.status(204).send();
            }
            catch (error) {
                const { status, message } = errorHandle_1.default.handleError(error);
                res.status(status).send(message);
            }
        });
    }
}
exports.default = new BookController();
