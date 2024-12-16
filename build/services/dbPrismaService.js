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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DBPrismaService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.prisma.book.findMany();
                return books;
            }
            catch (error) {
                this.logError(error);
                throw error;
            }
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.prisma.book.findUniqueOrThrow({
                    where: {
                        id,
                    },
                });
                return book;
            }
            catch (error) {
                this.logError(error);
                throw error;
            }
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBook = yield this.prisma.book.create({ data: book });
                return createBook;
            }
            catch (error) {
                this.logError(error);
                throw error;
            }
        });
    }
    updateBookById(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = new Map();
                Object.keys(book).forEach((key) => {
                    const value = book[key];
                    if (value) {
                        data.set(key, value);
                    }
                });
                const updateBook = yield this.prisma.book.update({
                    where: { id },
                    data: Object.fromEntries(data),
                });
                return updateBook;
            }
            catch (error) {
                this.logError(error);
                throw error;
            }
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.book.delete({ where: { id } });
            }
            catch (error) {
                this.logError(error);
                throw error;
            }
        });
    }
    logError(error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("An unknown error occurred");
        }
    }
}
exports.default = new DBPrismaService();
