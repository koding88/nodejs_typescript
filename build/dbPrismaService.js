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
            const books = yield this.prisma.book.findMany();
            return books;
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.prisma.book.findUniqueOrThrow({
                where: {
                    id,
                },
            });
            return book;
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const createBook = yield this.prisma.book.create({ data: book });
            return createBook;
        });
    }
    updateBookById(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Map();
            Object.keys(book).forEach((key) => {
                const value = book[key];
                if (value !== undefined) {
                    data.set(key, value);
                }
            });
            const updateBook = yield this.prisma.book.update({
                where: { id },
                data: Object.fromEntries(data),
            });
            return updateBook;
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.book.delete({ where: { id } });
        });
    }
}
exports.default = new DBPrismaService();
