import { Book, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { CreateBookSchema, UpdateBookSchema } from "../zodSchema";

class DBPrismaService {
    private prisma = new PrismaClient();

    public async getBooks(): Promise<Book[]> {
        try {
            const books = await this.prisma.book.findMany();
            return books;
        } catch (error: unknown) {
            this.logError(error);
            throw error;
        }
    }

    public async getBookById(id: number): Promise<Book> {
        try {
            const book = await this.prisma.book.findUniqueOrThrow({
                where: {
                    id,
                },
            });
            return book;
        } catch (error: unknown) {
            this.logError(error);
            throw error;
        }
    }

    public async insertBook(book: z.infer<typeof CreateBookSchema>): Promise<Book> {
        try {
            const createBook = await this.prisma.book.create({ data: book });
            return createBook;
        } catch (error: unknown) {
            this.logError(error);
            throw error;
        }
    }

    public async updateBookById(
        id: number,
        book: z.infer<typeof UpdateBookSchema>
    ): Promise<Book> {
        try {
            const data = new Map<string, string | boolean | undefined>();
            Object.keys(book).forEach((key) => {
                const value = book[key as keyof typeof book];
                if (value) {
                    data.set(key, value);
                }
            });
            const updateBook: Book = await this.prisma.book.update({
                where: { id },
                data: Object.fromEntries(data),
            });
            return updateBook;
        } catch (error: unknown) {
            this.logError(error);
            throw error;
        }
    }

    public async deleteBookById(id: number): Promise<void> {
        try {
            await this.prisma.book.delete({ where: { id } });
        } catch (error: unknown) {
            this.logError(error);
            throw error;
        }
    }

    private logError(error: unknown): void {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
}

export default new DBPrismaService();
