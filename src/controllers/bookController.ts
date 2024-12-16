import { Request, Response } from "express";
import dbPrismaService from "../services/dbPrismaService";
import errorHandle from "../services/errorHandle";
import { CreateBookSchema, UpdateBookSchema } from "../zodSchema";

class BookController {
    public async getBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await dbPrismaService.getBooks();
            res.status(200).json(books);
        } catch (error) {
            const { status, message } = errorHandle.handleError(error);
            res.status(status).send(message);
        }
    }

    public async getBookById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const book = await dbPrismaService.getBookById(Number(id));
            res.status(200).json(book);
        } catch (error: unknown) {
            const { status, message } = errorHandle.handleError(error);
            res.status(status).send(message);
        }
    }

    public async createBook(req: Request, res: Response): Promise<void> {
        const book = CreateBookSchema.safeParse(req.body);
        if (book.success) {
            try {
                const createdBook = await dbPrismaService.insertBook(book.data);
                res.status(201).json(createdBook);
            } catch (error: unknown) {
                const { status, message } = errorHandle.handleError(error);
                res.status(status).send(message);
            }
        } else {
            res.status(400).send(book.error.message);
        }
    }

    public async updateBook(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const book = UpdateBookSchema.safeParse(req.body);
        if (book.success) {
            const updates = book.data;
            try {
                const updateBook = await dbPrismaService.updateBookById(
                    Number(id),
                    updates
                );
                res.status(200).json(updateBook);
            } catch (error: unknown) {
                const { status, message } = errorHandle.handleError(error);
                res.status(status).send(message);
            }
        } else {
            res.status(400).send(book.error.message);
        }
    }

    public async deleteBook(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await dbPrismaService.deleteBookById(Number(id));
            res.status(204).send();
        } catch (error: unknown) {
            const { status, message } = errorHandle.handleError(error);
            res.status(status).send(message);
        }
    }
}

export default new BookController();
