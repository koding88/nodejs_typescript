CREATE DATABASE neondb;
CREATE TABLE Book(ID SERIAL PRIMARY KEY, TITLE TEXT NOT NULL, AUTHOR TEXT NOT NULL, PUBLISHED BOOLEAN NOT NULL);
SELECT * FROM Book;
SELECT * FROM book WHERE id = $1;
INSERT INTO Book (title, author, published) VALUES ($1, $2, $3);
UPDATE book SET title = value, author = value, published = value WHERE id = value;
DELETE FROM book WHERE id = $1;