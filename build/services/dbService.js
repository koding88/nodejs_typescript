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
const pg_1 = require("pg");
class DBService {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: "postgresql://neondb_owner:8a3viLKgbfYV@ep-cold-sound-a5sfjlf2-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM book");
            return result.rows;
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM book WHERE id = $1;", [id]);
            return result.rows[0] || null;
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query("INSERT INTO book (title, author, published) VALUES($1, $2, $3)", [book.title, book.author, book.published]);
            return;
        });
    }
    updateBookById(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE book SET ";
            const values = [];
            let paramCount = 1;
            const keys = Object.keys(updates).filter((key) => updates[key] !== undefined);
            const setStatements = keys.map((key) => {
                values.push(updates[key]);
                return `${key} = $${paramCount++}`;
            });
            query += setStatements.join(", ");
            query += ` WHERE id = $${paramCount}`;
            values.push(id);
            yield this.pool.query(query, values);
            const updatedBook = yield this.getBookById(id);
            return updatedBook;
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query("DELETE FROM book WHERE id = $1", [id]);
            return;
        });
    }
}
exports.default = new DBService();
