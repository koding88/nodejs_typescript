import { Pool } from "pg";

export type Book = {
    title: string;
    author: string;
    published: boolean;
};

export type BookUpdate = {
    title: string | undefined;
    author: string | undefined;
    published: boolean | undefined;
};

class DBService {
    private pool = new Pool({
        connectionString:
            "postgresql://neondb_owner:8a3viLKgbfYV@ep-cold-sound-a5sfjlf2-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    });

    public async getBooks(): Promise<Book[]> {
        const result = await this.pool.query("SELECT * FROM book");

        return result.rows;
    }

    public async getBookById(id: number): Promise<Book> {
        const result = await this.pool.query(
            "SELECT * FROM book WHERE id = $1;",
            [id]
        );

        return result.rows[0] || null;
    }

    public async insertBook(book: Book): Promise<void> {
        await this.pool.query(
            "INSERT INTO book (title, author, published) VALUES($1, $2, $3)",
            [book.title, book.author, book.published]
        );

        return;
    }

    public async updateBookById(
        id: number,
        updates: BookUpdate
    ): Promise<Book> {
        let query = "UPDATE book SET ";
        const values: any[] = [];
        let paramCount = 1;

        const keys = Object.keys(updates).filter(
            (key) => updates[key as keyof BookUpdate] !== undefined
        );

        const setStatements = keys.map((key) => {
            values.push(updates[key as keyof BookUpdate]);
            return `${key} = $${paramCount++}`;
        });

        query += setStatements.join(", ");
        query += ` WHERE id = $${paramCount}`;
        values.push(id);

        await this.pool.query(query, values);
        const updatedBook = await this.getBookById(id);
        return updatedBook;
    }

    public async deleteBookById(id: number): Promise<void> {
        await this.pool.query("DELETE FROM book WHERE id = $1", [id]);
        return;
    }
}

export default new DBService();
