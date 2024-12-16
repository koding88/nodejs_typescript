import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book API",
            version: "1.0.0",
            description: "A simple Express Book API",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            schemas: {
                Book: {
                    type: "object",
                    required: ["title", "author", "published"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "The auto-generated id of the book",
                        },
                        title: {
                            type: "string",
                            description: "The title of the book",
                        },
                        author: {
                            type: "string",
                            description: "The author of the book",
                        },
                        published: {
                            type: "boolean",
                            description: "Whether the book is published",
                        },
                    },
                },
                CreateBook: {
                    type: "object",
                    required: ["title", "author", "published"],
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the book",
                        },
                        author: {
                            type: "string",
                            description: "The author of the book",
                        },
                        published: {
                            type: "boolean",
                            description: "Whether the book is published",
                        },
                    },
                },
                UpdateBook: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the book",
                            nullable: true,
                        },
                        author: {
                            type: "string",
                            description: "The author of the book",
                            nullable: true,
                        },
                        published: {
                            type: "boolean",
                            description: "Whether the book is published",
                            nullable: true,
                        },
                    },
                },
            },
        },
        paths: {
            "/books": {
                get: {
                    tags: ["Books"],
                    summary: "Get all books",
                    responses: {
                        "200": {
                            description: "List of books",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Book",
                                        },
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Server error",
                        },
                    },
                },
                post: {
                    tags: ["Books"],
                    summary: "Create a new book",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateBook",
                                },
                            },
                        },
                    },
                    responses: {
                        "201": {
                            description: "Book created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Book",
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Invalid input",
                        },
                        "500": {
                            description: "Server error",
                        },
                    },
                },
            },
            "/books/{id}": {
                get: {
                    tags: ["Books"],
                    summary: "Get a book by ID",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Book found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Book",
                                    },
                                },
                            },
                        },
                        "404": {
                            description: "Book not found",
                        },
                        "500": {
                            description: "Server error",
                        },
                    },
                },
                put: {
                    tags: ["Books"],
                    summary: "Update a book",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UpdateBook",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Book updated successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Book",
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Invalid input",
                        },
                        "404": {
                            description: "Book not found",
                        },
                        "500": {
                            description: "Server error",
                        },
                    },
                },
                delete: {
                    tags: ["Books"],
                    summary: "Delete a book",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        "204": {
                            description: "Book deleted successfully",
                        },
                        "404": {
                            description: "Book not found",
                        },
                        "500": {
                            description: "Server error",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(options);
